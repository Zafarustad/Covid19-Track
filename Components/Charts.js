import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {fetchDailyData} from '../Api/api';
import {LineChart, BarChart} from 'react-native-chart-kit';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const width = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 6,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const Charts = ({data, country}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchData();
  }, []);

  const formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  const finalData =
    dailyData.length > 0 ? dailyData.splice(dailyData.length - 10, 10) : null;

  const line =
    finalData !== null ? (
      <LineChart
        data={{
          labels: finalData.map(({date}) => date),
          datasets: [
            {
              data: finalData.map(({confirmed}) => confirmed),
              color: (opacity = 0.7) => `rgba(0, 0, 255, ${opacity})`,
            },
            {
              data: finalData.map(({deaths}) => deaths),
              color: (opacity = 0.7) => `rgba(255, 0, 0, ${opacity})`,
            },
          ],
          legend: ['Confirmed', 'Deaths'],
        }}
        width={width * 0.9}
        height={400}
        fromZero={true}
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 5,
        }}
        verticalLabelRotation={120}
        onDataPointClick={({value, dataset, getColor}) =>
          showMessage({
            message: `Value: ${formatNumber(value)}`,
            backgroundColor: getColor(0.8),
          })
        }
      />
    ) : null;

  const bar = () => {
    const {confirmed, recovered, deaths} = data;
    const activeCases = confirmed.value - (recovered.value + deaths.value);
    return (
      <BarChart
        style={{
          marginVertical: 8,
          borderRadius: 5,
        }}
        data={{
          labels: ['Confirmed', 'Recoveries', 'Deaths', 'Active'],
          datasets: [
            {
              data: [
                confirmed.value,
                recovered.value,
                deaths.value,
                activeCases,
              ],
              color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
            },
          ],
        }}
        width={width * 0.9}
        height={350}
        fromZero={true}
        chartConfig={chartConfig}
      />
    );
  };

  return country && country !== 'Global' ? (
    <View>{bar()}</View>
  ) : (
    <View>
      {line}
      <FlashMessage
        duration={1000}
        position="bottom"
        floating={true}
        style={{width: width * 0.8, height: 45}}
      />
    </View>
  );
};

export default Charts;

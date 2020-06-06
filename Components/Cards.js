import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Loader from './Loader';

const Cards = ({data}) => {
  if (!data) {
    return (
      <View style={styles.container}>
        {Array.from({length: 4}).map((item, i) => (
          <Loader key={i} />
        ))}
      </View>
    );
  }

  const formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  const activeCases =
    data.confirmed.value - (data.recovered.value + data.deaths.value);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {borderBottomColor: 'rgba(0, 0, 255, 0.7)', borderBottomWidth: 6},
        ]}>
        <Text style={[styles.text, styles.title]}>Total Infected</Text>
        <Text style={[styles.text, styles.value]}>
          {formatNumber(data.confirmed.value)}
        </Text>
        <Text style={[styles.text, styles.date]}>
          Last Updated: {new Date(data.lastUpdate).toDateString()}
        </Text>
      </View>
      <View
        style={[
          styles.card,
          {borderBottomColor: 'rgba(0, 255, 0, 0.7)', borderBottomWidth: 5},
        ]}>
        <Text style={[styles.text, styles.title]}>Total Recoveries</Text>
        <Text style={[styles.text, styles.value]}>
          {formatNumber(data.recovered.value)}
        </Text>
        <Text style={[styles.text, styles.date]}>
          Last Updated: {new Date(data.lastUpdate).toDateString()}
        </Text>
      </View>
      <View
        style={[
          styles.card,
          {borderBottomColor: 'rgba(255, 0, 0, 0.7)', borderBottomWidth: 6},
        ]}>
        <Text style={[styles.text, styles.title]}>Total Deaths</Text>
        <Text style={[styles.text, styles.value]}>
          {formatNumber(data.deaths.value)}
        </Text>
        <Text style={[styles.text, styles.date]}>
          Last Updated: {new Date(data.lastUpdate).toDateString()}
        </Text>
      </View>
      <View
        style={[
          styles.card,
          {borderBottomColor: '#fb8c00', borderBottomWidth: 6},
        ]}>
        <Text style={[styles.text, styles.title]}>Total Active Cases</Text>
        <Text style={[styles.text, styles.value]}>
          {formatNumber(activeCases)}
        </Text>
        <Text style={[styles.text, styles.date]}>
          Last Updated: {new Date(data.lastUpdate).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Cards;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'space-between',
    padding: 30,
    margin: 10,
    borderRadius: 6,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: width * 0.8,
  },
  text: {
    marginVertical: 5,
  },
  title: {
    fontSize: 22,
  },
  value: {
    fontSize: 18,
  },
  date: {
    opacity: 0.6,
  },
});

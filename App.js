import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Cards, Charts, CountryPicker} from './Components/index';
import {fetchData} from './Api/api';

class App extends Component {
  state = {
    data: null,
    country: '',
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData});
  }

  onCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({data: fetchedData, country: country});
  };

  render() {
    const {data, country} = this.state;
    return (
      <ScrollView>
        <Text style={styles.appHeader}>Covid-19 Tracker</Text>
        <View style={styles.appContainer}>
          <CountryPicker
            onCountryChange={(country) => this.onCountryChange(country)}
          />
          <Cards data={data} />
          <Charts country={country} data={data} />
        </View>
      </ScrollView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  appHeader: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 30,
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

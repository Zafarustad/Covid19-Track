import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {getAllCountries} from '../Api/api';
import {Dropdown} from 'react-native-material-dropdown';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CountryPicker = ({onCountryChange}) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setCountries(await getAllCountries());
    };
    fetchCountries();
  }, []);

  const allCountries = countries.countries
    ? countries.countries.map((country, i) => {
        return {
          value: country.name,
        };
      })
    : null;

  allCountries
    ? allCountries.unshift({
        value: 'Global',
      })
    : null;

  return countries.countries ? (
    <View style={styles.pickerCont}>
      <Dropdown
        label="Pick Country"
        data={allCountries}
        baseColor="rgba(0, 0, 0, 0.6)"
        pickerStyle={styles.pickerStyle}
        onChangeText={(value) => onCountryChange(value)}
      />
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  pickerCont: {
    width: width * 0.7,
  },
  pickerStyle: {
    height: height * 0.4,
    marginTop: 90,
  },
});

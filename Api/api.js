import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let newUrl = url;

  if (country) {
    newUrl = `${url}/countries/${country}`;
  }

  if (country === 'Global') {
    newUrl = url;
  }

  try {
    const {
      data: {confirmed, recovered, deaths, lastUpdate},
    } = await axios.get(newUrl);

    const result = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const {data} = await axios.get(`${url}/daily`);

    const result = data.map((res) => ({
      confirmed: res.confirmed.total,
      deaths: res.deaths.total,
      date: res.reportDate,
    }));
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getAllCountries = async () => {
  try {
    const {data} = await axios.get(`${url}/countries`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

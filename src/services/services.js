import axios from 'axios';
import config from '../config';

const apiKey = config.apiKey;
const apiURL = config.apiURL;


const getUpcomingMovies = () => {
  const upcomingURL = `${apiURL}/upcoming?api_key=${apiKey}`;
  return axios.get(upcomingURL);
};

export default getUpcomingMovies;
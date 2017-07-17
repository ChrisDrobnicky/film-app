import axios from 'axios';
import Config from '../../config';

const apiKey = Config.apiKey;
const apiURL = Config.apiURL;


const getUpcomingMovies = () => {
  const upcomingURL = `${apiURL}'upcoming?'${apiKey}`;
  axios.get(upcomingURL)
    .then(function (response) {
     return response;
    })
    .catch(function (error) {
     return error;
    })
};

export default getUpcomingMovies;
import axios from 'axios';
import config from '../config';

const apiKey = config.apiKey;
const apiURL = config.apiURL;


export const getUpcomingMovies = () => {
  const upcomingURL = `${apiURL}/movie/upcoming?api_key=${apiKey}`;
  return axios.get(upcomingURL);
};

export const getThisYearMovies = (year) => {
  const moviesURL = `${apiURL}/discover/movie?api_key=${apiKey}&sort_by=vote_count.desc&primary_release_year=${year}`;
  return axios.get(moviesURL);
};

export const filterMovies = (filters) => {
  let basicURL = `${apiURL}/discover/movie?api_key=${apiKey}`;
  for (let filter in filters) {
    if (filters.hasOwnProperty(filter) && filters[filter].value) {
      basicURL = basicURL.concat(`&${filters[filter].apiName}=${filters[filter].value}`)
    }
  }
  return axios.get(basicURL);
  debugger;
};

export const getMovieDetails = (id) => axios.get(`${apiURL}/movie/${id}?api_key=${apiKey}&language=en-US`);

export const getMovieCast = (id) => axios.get(`${apiURL}/movie/${id}/credits?api_key=${apiKey}`);
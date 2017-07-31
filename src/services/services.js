import axios from 'axios';
import config from '../config';

const apiKey = config.apiKey;
const apiURL = config.apiURL;


export const getUpcomingMovies = () => {
  const upcomingURL = `${apiURL}/movie/upcoming?api_key=${apiKey}`;
  return axios.get(upcomingURL);
};

export const get2017Movies = () => {
  const movies2017URL = `${apiURL}/discover/movie?api_key=${apiKey}&sort_by=vote_count.desc&primary_release_year=2017`;
  return axios.get(movies2017URL);
};

export const getMovieDetails = (id) => axios.get(`${apiURL}/movie/${id}?api_key=${apiKey}&language=en-US`);

export const getMovieCast = (id) => axios.get(`${apiURL}/movie/${id}/credits?api_key=${apiKey}`);
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

export const getGenres = () => {
  const genresURL = `${apiURL}/genre/movie/list?api_key=${apiKey}&language=en-US`;
  return axios.get(genresURL);
};

export const filterMovies = (filters) => {
  let basicURL = `${apiURL}/discover/movie?api_key=${apiKey}`;
  for (let filter in filters) {
    if (filters.hasOwnProperty(filter) && filters[filter].value !== null && filters[filter].value !== 'Any') {
      if (filters[filter].isList && filters[filter].value.length > 0) {
        const listToSave = filters[filter].value.map(genre => genre.value).join(',');
        basicURL = basicURL.concat(`&${filters[filter].apiName}=${listToSave}`)
      }
      else if (Array.isArray(filters[filter].value)) {
        filters[filter].value.forEach(
          (elem, index) => basicURL = basicURL.concat(`&${filters[filter].apiName[index]}=${elem}`));
      } else {
        basicURL = basicURL.concat(`&${filters[filter].apiName}=${filters[filter].value}`)
      }
    }
  }
  return axios.get(basicURL);
};

export const getMyMovies = () => {
  let savedMovies = JSON.parse(localStorage.getItem('myMovies'));
  return savedMovies ? savedMovies : [];
};

export const saveMyMovie = (myMovie) => {
  let savedMovies = JSON.parse(localStorage.getItem('myMovies'));

  if (savedMovies) {
    savedMovies.push(myMovie);
  } else {
    savedMovies = [myMovie];
  }
  localStorage.setItem('myMovies', JSON.stringify(savedMovies));
  return savedMovies;
};

export const deleteMyMovie = movieID => {
  const savedMovies = getMyMovies();
  const updatedMovies = savedMovies.filter(movie => movie.id !== movieID);
  localStorage.setItem('myMovies', JSON.stringify(updatedMovies));
  return updatedMovies;
};

export const getMovieDetails = (id) => axios.get(`${apiURL}/movie/${id}?api_key=${apiKey}&language=en-US`);
export const getMovieCast = (id) => axios.get(`${apiURL}/movie/${id}/credits?api_key=${apiKey}`);
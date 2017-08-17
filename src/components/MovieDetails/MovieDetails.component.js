import React from 'react';
import axios from 'axios';
import {getMovieDetails, getMovieCast} from '../../services/services';
import styles from './MovieDetails.stylesheet.css';

  function MovieDetails({ id, title, posterPath, voteCount, voteAverage, releaseDate, overview }) {
    debugger;
    axios.all([ getMovieDetails(id), getMovieCast(id) ]).then(axios.spread((res1, res2) =>{
      const genres = res1.data.genres.map(genre => {
        return genre.name;
      });
      const runtime = res1.data.runtime;
      const cast = res2.data.cast.map(actor => {
        return {
          name: actor.name,
          character: actor.character,
          id: actor.id
        }
      });
      debugger;
    }));

    return(
      <div>
        <div>title: {title}</div>
        <div>poster: {posterPath}</div>
        <div>votes: {voteCount}</div>
        <div>rating: {voteAverage}</div>
        <div>release date: {releaseDate}</div>
        <div>overview: {overview}</div>
      </div>
    );
  }

    export default MovieDetails;
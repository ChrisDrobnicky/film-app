import React, {Component} from 'react';
import axios from 'axios';

import styles from './MovieDetails.stylesheet.css';
import config from '../../config';
import {getMovieDetails, getMovieCast} from '../../services/services';

class MovieDetails extends Component {
  constructor() {
    super();
    this.handleBackClick = this.handleBackClick.bind(this);
    this.state = {
      genres: [],
      runtime: '',
      cast: []
    }
  }

  componentDidMount() {
    axios.all([getMovieDetails(this.props.id), getMovieCast(this.props.id)]).then(axios.spread((res1, res2) => {
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
      this.setState({
        genres,
        runtime,
        cast
      })
    }))
  }

  handleBackClick(status) {
    this.props.changeDetailsStatus(status);
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    const imageMedium = config.imageMedium;
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });
    const castToDisplay = this.state.cast.map((actor, index) => {
      return index > 4
        ? null
        : <li className={styles.movieCastItem} key={actor.id}> {`${actor.name} (as ${actor.character})`} </li>;
    });
    const releaseDate = this.props.releaseDate;
    const releaseYear = (new Date(releaseDate)).getFullYear();
    const runtimeHours = Math.floor(this.state.runtime / 60);
    const runtimeMinutes = this.state.runtime % 60;

    return(
      <div className={styles.Wrapper}>
        <div className="ui active modal" style={{top: "10%"}}>
          <div className="header">
            <span className="">{this.props.title} ({releaseYear})</span>
          </div>
          <div className="scrolling content">
            <div className="image content">
              <img className="image" src={`${imageBaseURL}${imageMedium}${this.props.posterPath}`} alt="Movie Poster"/>
              <div className="description">
                <p>{this.props.overview}</p>
              </div>
            </div>
            <div className="content">
              <p><i className="yellow small star icon"></i>{this.props.voteAverage}/10 ({this.props.voteCount} votes)</p>
              <p>Runtime: {runtimeHours}h {runtimeMinutes}min </p>
              <ul>Cast: {castToDisplay}</ul>
              <div>Genres: {genreToDisplay}</div>
            </div>
            <div className="">
              <button className="ui cancel button" onClick={() => this.handleBackClick(false)}>Back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
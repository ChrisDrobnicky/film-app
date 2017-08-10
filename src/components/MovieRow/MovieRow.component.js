import React, {Component} from 'react';
import axios from 'axios';
import styles from './MovieRow.stylesheet.css';
import config from '../../config';
import {getMovieDetails, getMovieCast} from '../../services/services';

class MovieRow extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      runtime: '',
      cast: []
    }
  }

  componentDidMount() {
    getMovieDetails(this.props.id).then(res => {
        const genres = res.data.genres.map(genre => {
          return genre.name;
        });
        const runtime = res.data.runtime;
        this.setState({
          genres,
          runtime,
        })
      })
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });
    const releaseDate = this.props.release_date;
    const releaseYear = (new Date(releaseDate)).getFullYear();

    return (
      <tr key={this.props.id} className={styles.tableRow}>
        <td className="collapsing">
          <div className="ui fitted slider checkbox">
            <input type="checkbox"/>
          </div>
        </td>
        <td className={styles.titleWrapper}>
          <span className={styles.movieTitle}> {this.props.title} </span>
          <span className={styles.movieImage}>
            <img src={`${imageBaseURL}${this.props.poster_path}`} alt="Movie Poster"/>
          </span>
        </td>
        <td className={styles.movieGenre}>
          <span>
            {genreToDisplay}
          </span>
        </td>
        <td className={styles.movieRating}>{this.props.vote_average}</td>
        <td className={styles.movieVotes}>{this.props.vote_count}</td>
        <td className={styles.movieDate}>{releaseYear}</td>
        <td className={styles.movieRuntime}>{this.state.runtime}</td>
        <td className={styles.movieDetails}>
          <button className="ui small teal button">Show details</button>
        </td>
      </tr>
    )
  }
}

export default MovieRow;

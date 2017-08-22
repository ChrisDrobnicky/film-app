import React, {Component} from 'react';
import styles from './MovieRow.stylesheet.css';
import config from '../../config';
import {getMovieDetails} from '../../services/services';

class MovieRow extends Component {
  constructor() {
    super();
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.state = {
      genres: [],
      runtime: '',
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

  handleDetailsClick(status, movieID) {
    this.props.changeDetailsStatus(status);
    this.props.saveMovieID(movieID)
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    const imageSmall = config.imageSmall;
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });
    const releaseDate = this.props.release_date;
    const releaseYear = (new Date(releaseDate)).getFullYear();

    return (
      <tr key={this.props.id} className={styles.tableRow}>
        <td className="collapsing">
          <div className="ui fitted slider checkbox">
            <input type="checkbox"/> <label></label>
          </div>
        </td>
        <td className={styles.titleWrapper}>
          <span className={styles.movieTitle}> {this.props.title} </span>
          <span className={styles.movieImage}>
            <img src={`${imageBaseURL}${imageSmall}${this.props.poster_path}`} alt="Movie Poster"/>
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
          <button
            className="ui small teal button"
            onClick={(event, movieID) => this.handleDetailsClick(true, this.props.id)}
          >Show details
          </button>
        </td>
      </tr>
    )
  }
}

export default MovieRow;

import React, {Component} from 'react';
import styles from './MovieRow.stylesheet.css';
import config from '../../config';
import {getMovieDetails, saveMyMovie, deleteMyMovie} from '../../services/services';

class MovieRow extends Component {
  constructor() {
    super();
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

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

  handleInputChange(event) {
    let isMovieChecked = event.target.checked;
    let myMovie = {
      id: this.props.id,
      title: this.props.title,
      poster: this.props.posterPath,
      genres: this.state.genres,
      rating: this.props.voteAverage,
      votes: this.props.voteCount,
      releaseYear: (new Date(this.props.releaseDate)).getFullYear(),
      runtime: this.state.runtime
    };
    let myMovieID = this.props.id;
    isMovieChecked ? saveMyMovie(myMovie) : deleteMyMovie(myMovieID);
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    const imageSmall = config.imageSmall;
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });
    const releaseDate = this.props.releaseDate;
    const releaseYear = (new Date(releaseDate)).getFullYear();

    return (
      <tr
        key={this.props.id}
        id={this.props.id}
        className={styles.tableRow}>
        <td className="collapsing">
          <div className="ui fitted slider checkbox">
            <input
              type="checkbox"
              onChange={this.handleInputChange}
              id={this.props.id}
            />
            <label htmlFor={this.props.id}></label>
          </div>
        </td>
        <td className={styles.titleWrapper}>
          <span className={styles.movieTitle}> {this.props.title} </span>
          <span className={styles.movieImage}>
            <img src={`${imageBaseURL}${imageSmall}${this.props.posterPath}`} alt="Movie Poster"/>
          </span>
        </td>
        <td className={styles.movieGenre}>
          <span>
            {genreToDisplay}
          </span>
        </td>
        <td className={styles.movieRating}>{this.props.voteAverage}</td>
        <td className={styles.movieVotes}>{this.props.voteCount}</td>
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

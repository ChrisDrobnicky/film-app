import React, {Component} from 'react';
import styles from './MovieRow.stylesheet.css';
import config from '../../config';
import {getMovieDetails, saveMyMovie, deleteMyMovie, getMyMovies} from '../../services/services';

class MovieRow extends Component {
  constructor() {
    super();
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isMovieInMyMovies = this.isMovieInMyMovies.bind(this);

    this.state = {
      genres: [],
      runtime: '',
      isMovieInMyMovies: false
    }
  }

  componentDidMount() {
    getMovieDetails(this.props.id).then(res => {
      const genres = res.data.genres.map(genre => {
        return genre.name;
      });
      const runtime = res.data.runtime;
      const checkMyMovies = this.isMovieInMyMovies(this.props.id);
      this.setState({
        genres,
        runtime,
        isMovieInMyMovies: checkMyMovies
      })
    })
  }

  handleDetailsClick(status, movieID) {
    this.props.changeDetailsStatus(status);
    this.props.saveMovieID(movieID);
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
      releaseYear: this.props.releaseYear,
      runtime: this.state.runtime,
      overview: this.props.overview
    };
    let myMovieID = this.props.id;
    isMovieChecked ? saveMyMovie(myMovie) : deleteMyMovie(myMovieID);
    this.setState( (prevState) => {
      return {isMovieInMyMovies: !prevState.isMovieInMyMovies }
    })
  }

  isMovieInMyMovies(movieID) {
    let myMovies = getMyMovies();
    let myMovie = myMovies.find( (movie) => {
      return movie.id === movieID
      }
    );
    return !!myMovie;
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    const imageSmall = config.imageSmall;
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });
    const releaseYear = this.props.releaseYear;

    return (
      <tr
        key={this.props.id}
        id={this.props.id}
        className={styles.tableRow}>
        {
          !this.props.isMyMovieTab &&
            <td className={`collapsing ${styles.addWrapper}`}>
              <div className="ui slider checkbox">
                <input
                  type="checkbox"
                  onChange={this.handleInputChange}
                  id={this.props.id}
                  checked={this.state.isMovieInMyMovies}
                  title={this.state.isMovieInMyMovies ? 'Remove from My Movies' : 'Add to My Movies'}
                />
                <label htmlFor={this.props.id}></label>
              </div>
            </td>
        }
        <td className={styles.titleWrapper}>
          <div className={styles.movieTitle}> {this.props.title} </div>
          <span className={styles.movieImage}>
            <img src={`${imageBaseURL}${imageSmall}${this.props.posterPath}`} alt="Movie Poster"/>
          </span>
        </td>
        <td className={styles.movieGenre}>
          <span className={styles.iconWrapper}>
            <i className="hashtag large icon"></i>
          </span>
          <span>
            {genreToDisplay}
          </span>
        </td>
        <td className={styles.movieRating}>
          <span className={styles.iconWrapper}>
            <i className="yellow star large icon"></i>
          </span>
          {this.props.voteAverage}
        </td>
        <td className={styles.movieVotes}>
          <span className={styles.iconWrapper}>
            <i className="users large icon"></i>
          </span>
          {this.props.voteCount}
        </td>
        <td className={styles.movieYear}>
          <span className={styles.iconWrapper}>
            <i className="calendar outline large icon"></i>
          </span>
          {releaseYear}
        </td>
        <td className={styles.movieRuntime}>
          <span className={styles.iconWrapper}>
            <i className="hourglass empty large icon"></i>
          </span>
          { this.state.runtime }
        </td>
        <td className={styles.movieDetails}>
          <button
            className="ui small teal button"
            onClick={(event, movieID) => this.handleDetailsClick(true, this.props.id)}
          >Show details
          </button>
        </td>
        {
          this.props.isMyMovieTab &&
            <td className={styles.movieDelete}>
              <button
                className="ui small red button"
                onClick={() => this.props.handleDeleteClick(this.props.id)}
              >Delete
              </button>
            </td>
        }
      </tr>
    )
  }
}

export default MovieRow;

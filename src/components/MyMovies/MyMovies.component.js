import React, {Component} from 'react';
import styles from './MyMovies.stylesheet.css';
import config from '../../config';
import {getMyMovies, deleteMyMovie} from '../../services/services';
import MovieDetails from '../MovieDetails/MovieDetails.component';

class MyMovies extends Component {
  constructor() {
    super();
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDetailsClick = this.handleDetailsClick.bind(this);

    this.getMovieToDetail = this.getMovieToDetail.bind(this);
    this.changeDetailsStatus = this.changeDetailsStatus.bind(this);
    this.saveMovieID = this.saveMovieID.bind(this);

    this.state = {
      myMovies: [],
      isDetailsMode: false,
      detailedMovieID: ''
    }
  }

  componentDidMount() {
    this.setState({ myMovies: getMyMovies() });
  }

  handleDeleteClick(myMovieID) {
    let updatedMovies = deleteMyMovie(myMovieID);
    this.setState({ myMovies: updatedMovies});
  }

  handleDetailsClick(status, movieID) {
    this.changeDetailsStatus(status);
    this.saveMovieID(movieID)
  }

  changeDetailsStatus(status) {
    this.setState({ isDetailsMode: status });
  }

  saveMovieID(movieID) {
    this.setState({ detailedMovieID: movieID });
  }

  getMovieToDetail(movieID) {
    return this.state.myMovies.find(movie => {
      return movie.id === movieID;
    });
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    const imageSmall = config.imageSmall;
    const movieToDetail  = this.getMovieToDetail(this.state.detailedMovieID);

    return(
      <div className={styles.Wrapper}>
        {
          !this.state.isDetailsMode ?
            <table className={`ui compact celled table`}>
              <thead className={styles.tableHead}>
              <tr>
                <th>Title</th>
                <th>Genres</th>
                <th>Rating</th>
                <th>Votes</th>
                <th>Release Year</th>
                <th>Runtime (minutes)</th>
                <th>Details</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {this.state.myMovies.map(movie =>
                <tr
                  key={movie.id}
                  id={movie.id}
                  className={styles.tableRow}>
                  <td className={styles.titleWrapper}>
                    <span className={styles.movieTitle}>{movie.title}</span>
                    <span className={styles.movieImage}>
                    <img src={`${imageBaseURL}${imageSmall}${movie.poster}`} alt="Movie Poster"/>
                  </span>
                  </td>
                  <td className={styles.movieGenre}>
                    <span>{(movie.genres).join(', ')}</span>
                  </td>
                  <td className={styles.movieRating}>{movie.rating}</td>
                  <td className={styles.movieVotes}>{movie.votes}</td>
                  <td className={styles.movieDate}>{movie.releaseYear}</td>
                  <td className={styles.movieRuntime}>{movie.runtime}</td>
                  <td className={styles.movieDetails}>
                    <button
                      className="ui small teal button"
                      onClick={(event, movieID) => this.handleDetailsClick(true, movie.id)}
                    >Show details
                    </button>
                  </td>
                  <td className={styles.movieDelete}>
                    <button
                      className="ui small red button"
                      onClick={() => this.handleDeleteClick(movie.id)}
                    >Delete
                    </button>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
            : <MovieDetails
            id={movieToDetail.id}
            key={movieToDetail.id}
            title={movieToDetail.title}
            posterPath={movieToDetail.poster}
            voteAverage={movieToDetail.rating}
            voteCount={movieToDetail.votes}
            releaseYear={movieToDetail.releaseYear}
            overview={movieToDetail.overview}
            changeDetailsStatus={this.changeDetailsStatus}
          />
        }
      </div>
    );
  }
}

export default MyMovies;

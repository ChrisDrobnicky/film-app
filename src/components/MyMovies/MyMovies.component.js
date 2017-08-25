import React, {Component} from 'react';
import styles from './MyMovies.stylesheet.css';
import {getMyMovies, deleteMyMovie} from '../../services/services';
import MovieDetails from '../MovieDetails/MovieDetails.component';
import MovieRow from '../MovieRow/MovieRow.component';

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
      isComponentLoading: true,
      isDetailsMode: false,
      detailedMovieID: ''
    }
  }

  componentDidMount() {
    this.setState({
      myMovies: getMyMovies(),
      isComponentLoading: false
    });
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
    const movieToDetail  = this.getMovieToDetail(this.state.detailedMovieID);

    return(
      <div className={styles.Wrapper}>
        {
          !this.state.isDetailsMode ? (
            this.state.isComponentLoading ? <span>Loading...</span> :
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
                  <MovieRow
                    id={movie.id}
                    key={movie.id}
                    title={movie.title}
                    posterPath={movie.poster}
                    voteAverage={movie.rating}
                    voteCount={movie.votes}
                    releaseYear={movie.releaseYear}
                    changeDetailsStatus={this.changeDetailsStatus}
                    saveMovieID={this.saveMovieID}
                    isMyMovieTab={true}
                    handleDeleteClick={this.handleDeleteClick}
                  />
                )}
                </tbody>
              </table>
          ) : (
              <MovieDetails
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
          )
        }
      </div>
    );
  }
}

export default MyMovies;

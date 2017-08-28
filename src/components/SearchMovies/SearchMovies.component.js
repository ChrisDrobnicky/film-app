import React, {Component} from 'react';

import styles from './SearchMovies.stylesheet.css';
import {getThisYearMovies, filterMovies} from '../../services/services';
import MovieRow from '../MovieRow/MovieRow.component';
import FilterMovies from '../FilterMovies/FilterMovies.component';
import RandomSearch from '../RandomSearch/RandomSearch.component';
import MovieDetails from '../MovieDetails/MovieDetails.component';

class SearchMovies extends Component {
  constructor() {
    super();
    this.updateMovies = this.updateMovies.bind(this);
    this.changeRandomStatus = this.changeRandomStatus.bind(this);
    this.changeDetailsStatus = this.changeDetailsStatus.bind(this);
    this.getMovieToDetail = this.getMovieToDetail.bind(this);
    this.saveMovieID = this.saveMovieID.bind(this);

    this.state = {
      movies: [],
      isComponentLoading: true,
      isRandomMode: false,
      isDetailsMode: false,
      detailedMovieID: ''
    }
  }

  componentDidMount() {
    let currentYear = new Date().getFullYear();
    getThisYearMovies(currentYear).then(res => this.setState({
      movies: res.data.results,
      isComponentLoading: false
    }));
  }

  updateMovies(filters) {
    this.setState({ isComponentLoading: true });
    filterMovies(filters).then(res => this.setState({
        movies: res.data.results,
        isComponentLoading: false
      })
    )
  }

  changeRandomStatus(status) {
    this.setState({ isRandomMode: status })
  }

  changeDetailsStatus(status) {
    this.setState({ isDetailsMode: status });
  }

  saveMovieID(movieID) {
    this.setState({ detailedMovieID: movieID });
  }

  getMovieToDetail(movieID) {
    return this.state.movies.find(movie => {
      return movie.id === movieID;
    });
  }

  render() {
    const allMovies = this.state.movies;
    const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
    const movieToDetail  = this.getMovieToDetail(this.state.detailedMovieID);
    let resultsComponent = !this.state.isRandomMode ? (
      <table className={`ui compact celled table`}>
        <thead className={styles.tableHead}>
        <tr>
          <th>Add</th>
          <th>Title</th>
          <th>Genres</th>
          <th>Rating</th>
          <th>Votes</th>
          <th>Release Year</th>
          <th>Runtime (minutes)</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        {this.state.movies.map(movie =>
          <MovieRow
            id={movie.id}
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteCount={movie.vote_count}
            voteAverage={movie.vote_average}
            releaseYear={new Date(movie.release_date).getFullYear()}
            overview={movie.overview}
            changeDetailsStatus={this.changeDetailsStatus}
            saveMovieID={this.saveMovieID}
          />
        )}
        </tbody>
      </table>
    ) : (
      <RandomSearch
        id={randomMovie.id}
        key={randomMovie.id}
        title={randomMovie.title}
        posterPath={randomMovie.poster_path}
        voteCount={randomMovie.vote_count}
        voteAverage={randomMovie.vote_average}
        releaseYear={new Date(randomMovie.release_date).getFullYear()}
        overview={randomMovie.overview}
        changeDetailsStatus={this.changeDetailsStatus}
        saveMovieID={this.saveMovieID}
      />
    );
    return(
      <div className={styles.Wrapper}>
        <FilterMovies
          updateMovies={this.updateMovies}
          changeRandomStatus={this.changeRandomStatus}
        />
        {
          !this.state.isDetailsMode ?
            this.state.isComponentLoading ? <span>Loading...</span> : resultsComponent
            : <MovieDetails
            id={movieToDetail.id}
            key={movieToDetail.id}
            title={movieToDetail.title}
            posterPath={movieToDetail.poster_path}
            voteCount={movieToDetail.vote_count}
            voteAverage={movieToDetail.vote_average}
            releaseYear={new Date(movieToDetail.release_date).getFullYear()}
            overview={movieToDetail.overview}
            changeDetailsStatus={this.changeDetailsStatus}
          />
        }
      </div>
    )
  }
}

export default SearchMovies;

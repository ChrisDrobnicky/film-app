import React, {Component} from 'react';

import styles from './SearchMovies.stylesheet.css';
import {getThisYearMovies} from '../../services/services';
import {filterMovies, saveMyMovie, getMyMovies, deleteMyMovie} from '../../services/services';


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
    this.handleAddMyMovie = this.handleAddMyMovie.bind(this);
    this.handleDeleteMyMovie = this.handleDeleteMyMovie.bind(this);

    this.state = {
      movies: [],
      isComponentLoading: true,
      isRandomMode: false,
      isDetailsMode: false,
      detailedMovieID: '',
      myMovies: getMyMovies()
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
    this.setState( {detailedMovieID: movieID });
  }

  getMovieToDetail(movieID) {
    return this.state.movies.find(movie => {
      return movie.id === movieID;
    });
  }

  handleAddMyMovie(movieID) {
    let myMovie = this.state.movies.find(movie => {
      return movie.id === movieID;
    });
    let updatedMyMovies = saveMyMovie(myMovie);
    this.setState({ myMovies: updatedMyMovies });
  }

  handleDeleteMyMovie(movieID) {
    let updatedMyMovies = deleteMyMovie(movieID);
    this.setState({ myMovies: updatedMyMovies });
  }

  render() {
    const allMovies = this.state.movies;
    const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
    const movieToDetail  = this.getMovieToDetail(this.state.detailedMovieID);
    let resultsComponent = !this.state.isRandomMode ? (
      <table className={`ui compact celled definition table`}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Add </th>
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
            poster_path={movie.poster_path}
            vote_count={movie.vote_count}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
            changeDetailsStatus={this.changeDetailsStatus}
            saveMovieID={this.saveMovieID}
            handleAddMyMovie={this.handleAddMyMovie}
            handleDeleteMyMovie={this.handleDeleteMyMovie}
          />
        )}
        </tbody>
      </table>
    ) : (
        <RandomSearch
          id={randomMovie.id}
          key={randomMovie.id}
          title={randomMovie.title}
          poster_path={randomMovie.poster_path}
          vote_count={randomMovie.vote_count}
          vote_average={randomMovie.vote_average}
          release_date={randomMovie.release_date}
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
              releaseDate={movieToDetail.release_date}
              overview={movieToDetail.overview}
              changeDetailsStatus={this.changeDetailsStatus}
              />
        }
      </div>
    )
  }
}

export default SearchMovies;

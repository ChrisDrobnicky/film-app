import React, {Component} from 'react';

import styles from './SearchMovies.stylesheet.css';
import {getThisYearMovies} from '../../services/services';
import {filterMovies} from '../../services/services';
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
    this.getClickedMovie = this.getClickedMovie.bind(this);
    this.saveMovieID = this.saveMovieID.bind(this);

    this.state = {
      movies: [],
      isComponentLoading: true,
      isRandomMode: false,
      isDetailsMode: false,
      clickedMovieID: ''
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
    this.setState( {clickedMovieID: movieID });
  }

  getClickedMovie(movieID) {
    return this.state.movies.find(movie => {
        return movie.id === movieID;
      }
    );
  }

  render() {
    const allMovies = this.state.movies;
    const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
    const clickedMovie  = this.getClickedMovie(this.state.clickedMovieID);
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
        />
    );
    return(
      <div className={styles.Wrapper}>
        <FilterMovies
          updateMovies={this.updateMovies}
          changeRandomStatus={this.changeRandomStatus}
        />
        {this.state.isComponentLoading ? <span>Loading...</span> : resultsComponent}
        {this.state.isDetailsMode &&
          <MovieDetails
            id={clickedMovie.id}
            key={clickedMovie.id}
            title={clickedMovie.title}
            posterPath={clickedMovie.poster_path}
            voteCount={clickedMovie.vote_count}
            voteAverage={clickedMovie.vote_average}
            releaseDate={clickedMovie.release_date}
            overview={randomMovie.overview}
            blelum={this.getClickedMovie(this.state.clickedMovieID)}
          />
        }
      </div>
    )
  }
}

export default SearchMovies;

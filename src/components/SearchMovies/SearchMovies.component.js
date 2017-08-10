import React, {Component} from 'react';

import styles from './SearchMovies.stylesheet.css';
import {getThisYearMovies} from '../../services/services';
import {filterMovies} from '../../services/services';
import MovieRow from '../MovieRow/MovieRow.component';
import FilterMovies from '../FilterMovies/FilterMovies.component';

class SearchMovies extends Component {
  constructor() {
    super();
    this.updateMovies = this.updateMovies.bind(this);
    this.state = {
      movies: [],
      isComponentLoading: true
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

  render() {
    return(
      <div className={styles.Wrapper}>
        <FilterMovies
          updateMovies={this.updateMovies}
        />
        {
          this.state.isComponentLoading ?
            <span>Loading...</span> :
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
                  id={movie.id} key={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_count={movie.vote_count}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                />
              )}
              </tbody>
            </table>
        }
      </div>
    )
  }
}

export default SearchMovies;

import React, {Component} from 'react';

import styles from './SearchMovies.stylesheet.css';
import {get2017Movies} from '../../services/services';
import MovieRow from '../MovieRow/MovieRow.component'

class SearchMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      isComponentLoading: true
    }
  }

  componentDidMount() {
    get2017Movies().then(res => this.setState({
      movies: res.data.results,
      isComponentLoading: false
    }));
  }

  render() {
    return(
      <div className={styles.Wrapper}>
        {
          this.state.isComponentLoading ?
            <span>Loading...</span> :
            <table className={`ui selectable celled table ${styles.table}`}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genres</th>
                  <th>Cast</th>
                  <th>Rating</th>
                  <th>Number of Votes</th>
                  <th>Release Date</th>
                  <th>Details</th>
                  <th>Added to Your Movies</th>
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

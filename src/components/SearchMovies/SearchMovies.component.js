import React, {Component} from 'react';

import styles from './SearchMovies.stylesheet.css';
import {get2017Movies} from '../../services/services';
import config from '../../config';

class SearchMovies extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    get2017Movies().then(res => this.setState( {movies: res.data.results}));
  }

  render () {
    const imageBaseURL = config.imageBaseURL;
    return(
      <div className={styles.Wrapper}>
        <table className={`ui selectable celled table ${styles.table}`}>
          <thead>
          <tr>
            <th>Title</th>
            <th>Rating</th>
            <th>Release Date</th>
          </tr>
          </thead>
          <tbody>
          {this.state.movies.map ( (movie) => {
            return <tr key={movie.id}>
              <td>
                <span> {movie.title} </span>
                <span>
                  <img src={`${imageBaseURL}${movie.poster_path}`}/>
                </span>
              </td>
              <td> {movie.vote_average}</td>
              <td> {movie.release_date}</td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SearchMovies;

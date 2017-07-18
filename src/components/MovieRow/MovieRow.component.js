import React, {Component} from 'react';
import axios from 'axios';
import styles from './MovieRow.stylesheet.css';
import config from '../../config';
import {getMovieDetails, getMovieCast} from '../../services/services';

class MovieRow extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      cast: []
    }
  }

  componentDidMount() {
    axios.all([getMovieDetails(this.props.id), getMovieCast(this.props.id)])
      .then(axios.spread((res1, res2) => {
        const genres = res1.data.genres.map(genre => {
          return genre.name;
        });
        const cast = res2.data.cast.map(actor => {
          return actor.name;
        });
        this.setState({
          genres,
          cast
        })
      }))
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    return (
      <tr key={this.props.id}>
        <td>
          <span> {this.props.title} </span>
          <span>
            <img src={`${imageBaseURL}${this.props.poster_path}`}/>
          </span>
        </td>
        <td>{this.state.genres}</td>
        <td>{this.state.cast}</td>
        <td>{this.props.popularity}</td>
        <td>{this.props.vote_count}</td>
        <td>{this.props.vote_average}</td>
        <td>{this.props.overview}</td>
        <td>{this.props.release_date}</td>
      </tr>
    )
  }
}

export default MovieRow;

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
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });
    const castToDisplay = this.state.cast.map((actor, index) => {
      return index > 4 ? null : `${actor}, `;
      });

    return (
      <tr key={this.props.id}>
        <td>
          <span> {this.props.title} </span>
          <span>
            <img src={`${imageBaseURL}${this.props.poster_path}`}/>
          </span>
        </td>
        <td>
          <span>
            {genreToDisplay}
          </span>
        </td>
        <td>
          <span>
            {castToDisplay}
          </span>
        </td>
        <td>{this.props.vote_average}</td>
        <td>{this.props.vote_count}</td>
        <td>{this.props.release_date}</td>
        <td>
          <button className="ui teal button">Show details</button>
        </td>
        <td>
          <button className="ui green small button">Add to Your Movies</button>
        </td>
      </tr>
    )
  }
}

export default MovieRow;

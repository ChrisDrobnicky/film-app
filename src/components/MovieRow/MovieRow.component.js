import React, {Component} from 'react';
import styles from './MovieRow.stylesheet.css';
import config from '../../config';

class MovieRow extends Component {
  constructor() {
    super();
  }

  componentDidMount() {

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
        <td> {this.props.popularity}</td>
        <td> {this.props.vote_count}</td>
        <td> {this.props.vote_average}</td>
        <td> {this.props.overview}</td>
        <td> {this.props.release_date}</td>
      </tr>
    )
  }
}

export default MovieRow;

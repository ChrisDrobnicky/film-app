import React, {Component} from 'react';
import styles from './RandomSearch.stylesheet.css';
import config from '../../config';
import {getMovieDetails} from '../../services/services';

class RandomSearch extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      runtime: '',
    }
  }

  componentDidMount() {
    getMovieDetails(this.props.id).then(res => {
        const genres = res.data.genres.map(genre => {
          return genre.name;
        });
        const runtime = res.data.runtime;
        this.setState({
          genres,
          runtime,
        })
      })
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });

    return (
      <div className="wrapper">
        <div>Title:{this.props.title}</div>
        <div>
          <span>
            <img src={`${imageBaseURL}${this.props.poster_path}`} alt="Movie Poster"/>
          </span>
        </div>
        <div>Votes:{this.props.vote_count}</div>
        <div>Rating:{this.props.vote_average}</div>
        <div>Release Year:{this.props.release_date}</div>
        <div>Runtime:{this.state.runtime}</div>
        <div>
          <span> Genres: {genreToDisplay}</span>
        </div>
      </div>
    )
  }
}

export default RandomSearch;

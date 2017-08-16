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
    const imageMedium = config.imageMedium;
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });
    const releaseDate = this.props.release_date;
    const releaseYear = (new Date(releaseDate)).getFullYear();
    const runtimeHours = Math.floor(this.state.runtime / 60);
    const runtimeMinutes = this.state.runtime % 60;

    return (
      <div className="wrapper">
        <div className="ui card">
          <div className="content">
            <a className="header">{this.props.title}</a>
            <div className="meta">
              <span className="date">({releaseYear})</span>
            </div>
            <div className="image">
              <img src={`${imageBaseURL}${imageMedium}${this.props.poster_path}`} alt="Movie Poster"/>
            </div>
            <div className="description">
              {this.props.overview}
            </div>
          </div>
          <div className="content">
            <span>
              {runtimeHours}h {runtimeMinutes}min
            </span>
            <span className="right floated">
              <i className="yellow small star icon"></i>
              {this.props.vote_average}/10 ({this.props.vote_count} votes)
            </span>
          </div>
          <div className="extra content">
            <span className="">
              Genres: {genreToDisplay}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default RandomSearch;

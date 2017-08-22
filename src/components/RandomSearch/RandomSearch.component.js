import React, {Component} from 'react';
import styles from './RandomSearch.stylesheet.css';
import config from '../../config';
import {getMovieDetails} from '../../services/services';

class RandomSearch extends Component {
  constructor() {
    super();
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
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

  handleDetailsClick(event, status, movieID) {
    event.preventDefault();
    this.props.changeDetailsStatus(status);
    this.props.saveMovieID(movieID)
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
            <a
              className="header"
              title="Show movie details"
              onClick={(event, status, movieID) => this.handleDetailsClick(event, true, this.props.id)}
            >
              {this.props.title}
            </a>
            <div className="meta">
              <span className="date">({releaseYear})</span>
            </div>
            <div className={styles.imageWrapper}>
              <div className="image">
                <img src={`${imageBaseURL}${imageMedium}${this.props.poster_path}`} alt="Movie Poster"/>
              </div>
            </div>
            <div className="description">
              {this.props.overview}
            </div>
          </div>
          <div className="content">
            <div className={styles.contentWrapper}>
              <span className={styles.rating}>
                <i className="yellow small star icon"></i>
                {this.props.vote_average}/10 ({this.props.vote_count} votes)
              </span>
              <span className={styles.runtime}>
                {runtimeHours}h {runtimeMinutes}min
              </span>
            </div>
          </div>
          <div className="extra content">
            <span className="movieGenre">
              Genres: {genreToDisplay}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default RandomSearch;

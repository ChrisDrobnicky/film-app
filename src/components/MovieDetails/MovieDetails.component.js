import React, {Component} from 'react';
import axios from 'axios';

import styles from './MovieDetails.stylesheet.css';
import config from '../../config';
import {getMovieDetails, getMovieCast} from '../../services/services';

class MovieDetails extends Component {
  constructor() {
    super();
    this.handleBackClick = this.handleBackClick.bind(this);
    this.state = {
      genres: [],
      runtime: '',
      cast: [],
    }
  }

  componentDidMount() {
    axios.all([getMovieDetails(this.props.id), getMovieCast(this.props.id)]).then(axios.spread((res1, res2) => {
      const genres = res1.data.genres.map(genre => {
        return genre.name;
      });
      const runtime = res1.data.runtime;
      const cast = res2.data.cast.map(actor => {
        return {
          name: actor.name,
          character: actor.character,
          id: actor.id
        }
      });
      this.setState({
        genres,
        runtime,
        cast,
      })
    }))
  }

  handleBackClick(status) {
    this.props.changeDetailsStatus(status);
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    const imageMedium = config.imageMedium;
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });
    const castToDisplay = this.state.cast.map((actor, index) => {
      return index > 4
        ? null
        : <li className={styles.castItem} key={actor.id}> {`${actor.name} (as ${actor.character})`} </li>;
    });
    const releaseYear = this.props.releaseYear;
    const runtimeHours = Math.floor(this.state.runtime / 60);
    const runtimeMinutes = this.state.runtime % 60;

    return(
      <div className={styles.Wrapper}>
        <div className={`${styles.zoomIn} ui active modal`} style={{top: "10%"}}>
          <div className="header">
            <div className={styles.modalHeader}>
              <p className={styles.title}>{this.props.title}<span className={styles.year}> ({releaseYear})</span></p>
              <div className={styles.rating}>
                <span className={styles.average}>
                  <i className={`yellow ${window.innerWidth < 570 ? 'small' : 'large'} star icon`}/>
                  {this.props.voteAverage}
                </span>
                <span className={styles.count}>/10 ({this.props.voteCount} votes) </span>
              </div>
              <div className={styles.runtime}>
                <i className={`hourglass empty ${window.innerWidth < 570 ? 'small' : 'large'} icon`}/>
                {runtimeHours}h {runtimeMinutes}min
              </div>
              <div className={styles.genres}>
                <span className={styles.genresItem}>
                  <i className={`${window.innerWidth < 570 ? 'small' : 'large'} hashtag icon`}/>
                  {genreToDisplay}
                </span>
              </div>
            </div>
          </div>
          <div className={`scrolling content ${styles.modalContentWrapper}`}>
            <div className={styles.modalContent}>
              <div className={`image content ${styles.imageWrapper}`}>
                <img
                  className={`image ${styles.movieImage}`}
                  src={`${imageBaseURL}${imageMedium}${this.props.posterPath}`}
                  alt="Movie Poster"
                />
              </div>
              <div className={styles.descriptionWrapper}>
                <div className={`scrolling content ${styles.overviewWrapper}`}>
                  <h4 className={styles.overviewHeader}>Overview:</h4>
                  <p className={styles.overview}>{this.props.overview}</p>
                </div>
                <div className={`scrolling content ${styles.castWrapper}`}>
                  <h4 className={styles.castHeader}>Cast:</h4>
                  <ul className={styles.castList}>{castToDisplay}</ul>
                </div>
              </div>
            </div>
            <div className={styles.closeWrapper} onClick={() => this.handleBackClick(false)}>
              <i className={`window close ${window.innerWidth < 570 ? 'large' : 'big'} teal icon`}/>
            </div>
            <div className={styles.cancelButtonWrapper}>
              <button
                className={`ui cancel ${window.innerWidth < 570 ? 'tiny' : 'medium'} teal button`}
                onClick={() => this.handleBackClick(false)}
              >Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import Header from '../Header/Header.component';
import SearchMovies from '../SearchMovies/SearchMovies.component';
import MyMovies from '../MyMovies/MyMovies.component';
import About from '../About/About.component';
import Footer from '../Footer/Footer.component';
import styles from './App.stylesheet.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.App}>
          <Header />
          <Route exact path="/" component={SearchMovies}/>
          <Route path="/my-movies" component={MyMovies} />
          <Route path="/about" component={About} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

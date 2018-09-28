import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Routes from './routes';
import './App.css';

const App = ({ location, isAuthenticated }) => (
  <Routes location={location} isAuthenticated={isAuthenticated} />
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.rootReducer.auth.account
  };
}

export default connect(mapStateToProps)(App);
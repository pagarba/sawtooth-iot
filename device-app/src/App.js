import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import Routes from './routes';
import './App.css';
import { logout } from './core/actions/auth'

class App extends React.Component {

  async componentWillMount() {
    try {
      await axios.get('/things');
    } catch (e) {
      if (e.response && e.response.status === 403) {
        this.props.logout();
      }
    }
  }

  render () {
    const {isAuthenticated, location} = this.props

    return (
      <Routes location={location} isAuthenticated={isAuthenticated}/>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.rootReducer.auth.account && !!localStorage.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
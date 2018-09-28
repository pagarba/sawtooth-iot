import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles/index'
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '200px',
  },
})

class Page404 extends Component {
  render () {
    const { classes, isAuthenticated } = this.props;

    console.log(this.props);
    return (
      <div className={classes.root}>
        <Typography variant="display3" gutterBottom>
          404
        </Typography>
        <Typography variant="display1" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body2" gutterBottom>
          <span> Go to </span>
          <Link to={isAuthenticated ? '/dashboard' : 'login'}>
            {isAuthenticated ? 'Dashboard' : 'Login'}
          </Link>
        </Typography>
      </div>
    )
  }
}

Page404.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.rootReducer.auth.account
  };
}

const WithStyles = withStyles(styles, {withTheme: true})(Page404)
export default connect(mapStateToProps)(WithStyles);

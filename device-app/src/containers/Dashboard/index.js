import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';

import AddDeviceIcon from '@material-ui/icons/AddToQueue';
import ViewEventsIcon from '@material-ui/icons/Visibility';
import AddIntegration from '@material-ui/icons/SettingsInputComponent';
import TutorialIcon from '@material-ui/icons/School';

const styles = theme => ({
  dashboard: {
    textAlign: 'center',
    marginTop: '50px',
  },
  icon: {
    fontSize: '80px',
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  root: {
    flexGrow: 1,
  },
});

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.dashboard}>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={3}>
            <Link className={classes.link} to="/devices">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <AddDeviceIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography gutterBottom>Add Device</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Link className={classes.link} to="/events">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <ViewEventsIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography gutterBottom>View Events</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Link className={classes.link} to="/integrations">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <AddIntegration className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography gutterBottom>Add Integration</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Link className={classes.link} to="/tutorials">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <TutorialIcon className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography gutterBottom>Tutorial</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles/index";
import { events } from '../../constants';

const styles = theme => ({
  root: {
    display: 'block'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '2em'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: 'bold',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class EventDetail extends Component {
  render() {
    const { classes } = this.props;
    const deviceId = this.props.match.params.deviceId;
    const event = events.find(event => event.deviceId === deviceId);

    return (
      <div className={classes.root}>
        <table>
          <tbody>
            <tr>
              <td><b>Event Name: </b></td>
              <td>{event.eventName}</td>
            </tr>
            <tr>
              <td><b>Device ID: </b></td>
              <td>{event.deviceId}</td>
            </tr>
            <tr>
              <td><b>Data: </b></td>
              <td>{event.data}</td>
            </tr>
            <tr>
              <td><b>Published By: </b></td>
              <td>{event.publishedBy}</td>
            </tr>
            <tr>
              <td><b>Post Time: </b></td>
              <td>{event.postTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

EventDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EventDetail);

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles/index";
import { devices } from '../../constants';

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

class Devices extends Component {
  render() {
    const { classes } = this.props;
    const deviceId = this.props.match.params.deviceId;
    const device = devices.find(device => device.deviceId === deviceId);

    return (
      <div className={classes.root}>
        <table>
          <tbody>
            <tr>
              <td><b>Device ID: </b></td>
              <td>{device.deviceId}</td>
            </tr>
            <tr>
              <td><b>Device Key: </b></td>
              <td>{device.deviceKey}</td>
            </tr>
            <tr>
              <td><b>Device Name: </b></td>
              <td>{device.deviceName}</td>
            </tr>
            <tr>
              <td><b>Device Type: </b></td>
              <td>{device.deviceType}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

Devices.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Devices);

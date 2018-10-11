import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { withStyles } from "@material-ui/core/styles/index";

import ChannelDevicesTable from '../../../components/Tables/ChannelDevicesTable';
import { addDeviceToChannel, deleteDeviceFromChannel, getChannel, getChannels } from '../../../core/actions/channel'
import { getDevices } from '../../../core/actions/device'

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
    minWidth: '120px'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Devices extends Component {
  state = {
    expanded: null,
    deviceId: '',
  };

  componentWillMount() {
    this.props.getDevices();
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleBlur = event => {
    if (!this.state[event.target.name])
      this.setState({ [event.target.name]: null });
  };

  handleInputChange = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  addDeviceToChannel = () => {
    const { deviceId } = this.state;
    const { id: channelId } = this.props.channel;

    console.log(deviceId);
    if (deviceId) {
      this.props.addDeviceToChannel(
        channelId,
        deviceId
      ).then(() => {
        this.props.getChannel(channelId);
        this.setState({
          deviceId: '',
        })
      });
    }
  };

  deleteDeviceFromChannel = (deviceId) => {
    const { id } = this.props.channel;

    this.props.deleteDeviceFromChannel(id, deviceId)
      .then(() => {
        this.props.getChannel(id);
      })
      .catch(() => {
        alert('Error while disconnecting device');
      });
  }

  render() {
    const { classes, history } = this.props;
    const { expanded } = this.state;
    const connectedDevices = this.props.channel.connected || [];

    let devices = this.props.devices ? this.props.devices.things.filter(dev1 => 0 === connectedDevices.filter(dev2 => dev1.id === dev2.id).length) : [];

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Connect a New Device</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.root}>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="deviceId">Device</InputLabel>
                <Select
                  value={this.state.deviceId}
                  onChange={this.handleInputChange}
                  inputProps={{
                    name: 'deviceId',
                    id: 'deviceId',
                  }}
                >
                  {
                    devices.map((device) => (
                      <MenuItem value={device.id}>{device.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <Button
              className={classes.button}
              color="primary"
              onClick={this.addDeviceToChannel}
              variant="contained"
              disabled={this.props.isAddingDeviceToChannel}
            >
              Connect Device
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Connected Devices</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ChannelDevicesTable
              data={connectedDevices}
              history={history}
              onDeleteDeviceFromChannel={this.deleteDeviceFromChannel}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

Devices.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    devices: state.rootReducer.device.devices,
    isAddingDeviceToChannel: state.rootReducer.channel.isAddingDeviceToChannel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addDeviceToChannel: (channelId, deviceId) => dispatch(addDeviceToChannel(channelId, deviceId)),
    deleteDeviceFromChannel: (channelId, deviceId) => dispatch(deleteDeviceFromChannel(channelId, deviceId)),
    getChannels: () => dispatch(getChannels()),
    getDevices: () => dispatch(getDevices()),
    getChannel: (id) => dispatch(getChannel(id)),
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(Devices);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);
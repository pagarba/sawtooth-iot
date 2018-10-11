import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { withStyles } from "@material-ui/core/styles/index";
import { getDevice, editDevice } from '../../core/actions/device'

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

class DeviceDetail extends Component {
  constructor () {
    super();

    this.state = {
      isEditMode: false,
      key: '',
      name: '',
      type: '',
    };
  }

  componentWillMount() {
    const deviceId = this.props.match.params.deviceId;
    this.props.getDevice(deviceId);
  }

  componentWillReceiveProps(props) {
    this.setState({
      key: props.device.key,
      name: props.device.name,
      type: props.device.type,
    })
  }

  editDevice = () => {
    const { name, type } = this.state;
    const deviceId = this.props.match.params.deviceId;

    console.log(type);

    this.props.editDevice(deviceId, {
      name,
      type
    }).then(() => {
      this.props.getDevice(deviceId).then(() => {
        this.setState({
          isEditMode: false,
        })
      });
    });
  }

  enableEdit = (isEditMode) => {
    this.setState({
      isEditMode,
    })
  }

  handleInputChange = event => {
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { isEditMode } = this.state;

    const device = this.props.device || {};

    return (
      <div className={classes.root}>
        <table>
          <tbody>
            <tr>
              <td><b>Device ID: </b></td>
              <td>
                {device.id}
              </td>
            </tr>
            <tr>
              <td><b>Device Key: </b></td>
              <td>{ device.key }</td>
            </tr>
            <tr>
              <td><b>Device Type: </b></td>
              <td>{device.type}</td>
            </tr>
            <tr>
              <td><b>Device Name: </b></td>
              <td>
                {
                  isEditMode ? (
                    <FormControl className={classes.formControl} error={this.state.name === null} fullWidth aria-describedby="component-error-text">
                      <Input name="name" value={this.state.name} onChange={this.handleInputChange} />
                    </FormControl>
                  ) : device.name
                }
              </td>
            </tr>
          </tbody>
        </table>

        {
          isEditMode ? (
            <div>
              <Button
                className={classes.button}
                color="primary"
                onClick={this.editDevice}
                variant="contained"
                disabled={this.props.isEditingDevice}
              >
                Save
              </Button>
              <Button
                className={classes.button}
                color="primary"
                onClick={() => this.enableEdit(false)}
                variant="contained"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              className={classes.button}
              color="primary"
              onClick={() => this.enableEdit(true)}
              variant="contained"
            >
              Edit
            </Button>
          )
        }
      </div>
    )
  }
}

DeviceDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    device: state.rootReducer.device.device,
    isEditingDevice: state.rootReducer.device.isEditingDevice,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDevice: (id) => dispatch(getDevice(id)),
    editDevice: (id, data) => dispatch(editDevice(id, data)),
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(DeviceDetail);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);

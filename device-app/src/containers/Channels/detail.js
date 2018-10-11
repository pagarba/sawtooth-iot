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
import { getChannel, editChannel } from '../../core/actions/channel'
import ChannelDevices from './Devices';

const styles = theme => ({
  root: {
    display: 'block',
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

class ChannelDetail extends Component {
  constructor () {
    super();

    this.state = {
      isEditMode: false,
      name: '',
    };
  }

  componentWillMount() {
    const channelId = this.props.match.params.channelId;
    this.props.getChannel(channelId);
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.channel.name,
    })
  }

  editChannel = () => {
    const { name } = this.state;
    const channelId = this.props.match.params.channelId;

    this.props.editChannel(channelId, {
      name
    }).then(() => {
      this.props.getChannel(channelId).then(() => {
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
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { isEditMode } = this.state;

    const channel = this.props.channel || {};

    return (
      <div className={classes.root}>
        <table>
          <tbody>
            <tr>
              <td><b>Channel ID: </b></td>
              <td>
                {channel.id}
              </td>
            </tr>
            <tr>
              <td><b>Channel Name: </b></td>
              <td>
                {
                  isEditMode ? (
                    <FormControl className={classes.formControl} error={this.state.channelName === null} fullWidth aria-describedby="component-error-text">
                      <Input name="name" value={this.state.name} onChange={this.handleInputChange} />
                    </FormControl>
                  ) : channel.name
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
                onClick={this.editChannel}
                variant="contained"
                disabled={this.props.isEditingChannel}
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

        <br/> <br/> <br/>

        <ChannelDevices
          channel={channel}
        />
      </div>
    )
  }
}

ChannelDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    channel: state.rootReducer.channel.channel,
    isEditingChannel: state.rootReducer.channel.isEditingChannel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getChannel: (id) => dispatch(getChannel(id)),
    editChannel: (id, data) => dispatch(editChannel(id, data)),
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(ChannelDetail);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);

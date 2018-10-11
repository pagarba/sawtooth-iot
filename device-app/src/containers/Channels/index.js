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

import { withStyles } from "@material-ui/core/styles/index";

import ChannelsTable from '../../components/Tables/ChannelsTable';
import { createChannel, getChannels, deleteChannel } from '../../core/actions/channel';

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

class Channels extends Component {
  state = {
    expanded: null,
    channelName: '',
  };

  componentWillMount() {
    this.props.getChannels();
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
    this.setState({ [event.target.name]: event.target.value });
  };

  addChannel = () => {
    const { channelName } = this.state;

    if (channelName) {
      this.props.createChannel({
        name: channelName,
      }).then(() => {
        this.props.getChannels();
      });
    }
  };

  deleteChannel = (id) => {
    this.props.deleteChannel(id)
      .then(() => {
        this.props.getChannels();
      })
      .catch(() => {
        alert('Error while deleting channel');
      });
  }

  render() {
    const { classes, history } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Add a New Channel</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.root}>
            <FormControl className={classes.formControl} error={this.state.channelName === null} fullWidth aria-describedby="component-error-text">
              <InputLabel htmlFor="component-error">Channel Name*</InputLabel>
              <Input name="channelName" value={this.state.channelName} onChange={this.handleInputChange} onBlur={this.handleBlur} />
              <FormHelperText id="component-error-text">This field is required</FormHelperText>
            </FormControl>

            <Button
              className={classes.button}
              color="primary"
              onClick={this.addChannel}
              variant="contained"
              disabled={this.props.isCreatingDevice}
            >
              Add Channel
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My Channels</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ChannelsTable
              history={history}
              data={this.props.channels ? this.props.channels.channels : []}
              onDeleteChannel={this.deleteChannel}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

Channels.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    channels: state.rootReducer.channel.channels,
    isCreatingDevice: state.rootReducer.device.isCreatingDevice,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getChannels: () => dispatch(getChannels()),
    createChannel: data => dispatch(createChannel(data)),
    deleteChannel: id => dispatch(deleteChannel(id)),
  }
}

const WithStyles =  withStyles(styles, { withTheme: true })(Channels);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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

import EventsTable from '../../components/Tables/EventsTable';

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

class Events extends Component {
  state = {
    expanded: null,
    eventName: '',
    deviceId: '',
    data: '',
  };

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

  render() {
    const { classes, history } = this.props;
    const { expanded } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Add a New Event</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.root}>
            <FormControl className={classes.formControl} error={this.state.eventName === null} fullWidth aria-describedby="component-error-text">
              <InputLabel htmlFor="component-error">Event Name*</InputLabel>
              <Input name="eventName" value={this.state.eventName} onChange={this.handleInputChange} onBlur={this.handleBlur} />
              <FormHelperText id="component-error-text">This field is required</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl} error={this.state.deviceId === null} fullWidth aria-describedby="component-error-text">
              <InputLabel htmlFor="component-error">Device ID*</InputLabel>
              <Input name="deviceId" value={this.state.deviceId} onChange={this.handleInputChange} onBlur={this.handleBlur} />
              <FormHelperText id="component-error-text">This field is required</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl} fullWidth aria-describedby="component-error-text">
              <InputLabel htmlFor="component-error">Data</InputLabel>
              <Input name="data" value={this.state.data} onChange={this.handleInputChange} onBlur={this.handleBlur} />
              <FormHelperText id="component-error-text">This field is required</FormHelperText>
            </FormControl>

            <Button variant="contained" color="primary" className={classes.button}>
              Add Event
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My Events</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EventsTable
              history={history}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Events);

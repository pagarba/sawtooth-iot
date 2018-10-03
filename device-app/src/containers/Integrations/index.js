import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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

import JustifireLogo from '../../assets/img/justifire.png';
import VisualFlightsLogo from '../../assets/img/visual_flights.png';
import TriggerSmartLogo from '../../assets/img/trigger_smart.png';
import DataLifeLogo from '../../assets/img/datalife.png';
import GuniaryLogo from '../../assets/img/guniary.png';

import { integrations } from '../../constants';
import { newIntegrations } from '../../constants';

const logos = {
  justifire: JustifireLogo,
  visualFlights: VisualFlightsLogo,
  triggerSmart: TriggerSmartLogo,
  datalife: DataLifeLogo,
  guniary: GuniaryLogo,
}

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
  imgContainer: {
    marginRight: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  imgList: {
    alignItems: 'center',
    display: 'flex',
  },
  imgLogo: {
    height: '50px',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Integrations extends Component {
  state = {
    expanded: null,
    integrations: integrations,
    newIntegrations: newIntegrations,
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

  addIntegration = newIntegration => {
    let { integrations, newIntegrations } = this.state;

    integrations.push(newIntegration);
    newIntegrations = newIntegrations.filter(integration => integration !== newIntegration);

    this.setState({
      integrations,
      newIntegrations
    });

    console.log(integrations, newIntegrations);
  }

  render() {
    const { classes, history } = this.props;
    const { expanded } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My Integrations</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.imgList}>
              {
                this.state.integrations.map(integration => (
                  <div className={classes.imgContainer}>
                    <img src={logos[integration]} />
                  </div>
                ))
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Add a New Integration</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.root}>
            <div className={classes.imgList}>
              {
                this.state.newIntegrations.map(integration => (
                  <div className={classes.imgContainer}>
                    <img className={classes.imgLogo} src={logos[integration]} />
                    <Button
                      color="secondary"
                      className={classes.button}
                      onClick={() => this.addIntegration(integration)}
                      variant="contained"
                    >
                      + Add {integration}
                    </Button>
                  </div>
                ))
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

Integrations.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Integrations);

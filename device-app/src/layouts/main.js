import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';

import { AppBar, Button, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import DevicesIcon from '@material-ui/icons/Devices';
import ChannelsIcon from '@material-ui/icons/Radio';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventIcon from '@material-ui/icons/Event';
import IntegrationsIcon from '@material-ui/icons/SettingsInputComponent';
import TutorialsIcon from '@material-ui/icons/School';

import SideMenuItem from '../components/SideMenuItem';
import { logout, resetAccount } from '../core/actions/auth';
import { apiKey, appId } from '../config';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  btnLogout: {
    color: '#fff',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const pageTitles = {
  'dashboard': 'Dashboard',
  'devices': 'Devices',
  'channels': 'Channels',
  'channelDetail': 'Channel Detail',
  'deviceDetail': 'Device Detail',
  'events': 'Event Viewer',
  'integrations': 'Integrations',
  'tutorials': 'Tutorials'
};

class MainLayout extends React.Component {
  constructor() {
    super();

    this.state = {
      open: true,
    }
  }

  async componentWillMount() {
    let { account } = this.props;

    if (!account.logout) {
      const { loginKey, username } = account;
      const abc = require('airbitz-core-js');
      const abcContext = abc.makeContext({
        apiKey,
        appId,
      });

      account = await abcContext.loginWithKey(username, loginKey);

      this.props.resetAccount(account);
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  logout = async () => {
    let { account } = this.props;
    account.logout();
    this.props.logout();
  };

  render() {
    const { classes, pathname, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar
            className={classes.titleBar}
            disableGutters={!this.state.open}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              { pageTitles[pathname] }
            </Typography>
            <Button
              className={classes.btnLogout}
              onClick={this.logout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <SideMenuItem
              to="/dashboard"
              icon={<DashboardIcon/>}
              selected={pathname === 'dashboard'}
              text="Dashboard"
            />
            <SideMenuItem
              to="/devices"
              icon={<DevicesIcon/>}
              selected={pathname === 'devices' || pathname === 'deviceDetail'}
              text="Device Manager"
            />
            <SideMenuItem
              to="/channels"
              icon={<ChannelsIcon/>}
              selected={pathname === 'channels' || pathname === 'channelDetail'}
              text="Channels"
            />
            <SideMenuItem
              to="/events"
              icon={<EventIcon/>}
              selected={pathname === 'events'}
              text="Event Viewer"
            />
            <SideMenuItem
              to="/integrations"
              icon={<IntegrationsIcon/>}
              selected={pathname === 'integrations'}
              text="Integrations"
            />
            <SideMenuItem
              to="/tutorials"
              icon={<TutorialsIcon/>}
              selected={pathname === 'tutorials'}
              text="Tutorials"
            />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    account: state.rootReducer.auth.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    resetAccount: account => dispatch(resetAccount(account)),
  };
}

const WithStyles = withStyles(styles, { withTheme: true })(MainLayout);
export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);
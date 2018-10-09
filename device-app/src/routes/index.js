import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainLayout from '../layouts/main';
import GuestLayout from '../layouts/guest';
import Page404 from '../containers/Page404';
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import Devices from '../containers/Devices';
import DeviceDetail from '../containers/Devices/detail';
import Channels from '../containers/Channels';
import ChannelDetail from '../containers/Channels/detail';
import Events from '../containers/Events';
import EventDetail from '../containers/Events/detail';
import Integrations from '../containers/Integrations';

const userPaths = [
  'dashboard',
  'devices',
  'deviceDetail',
  'channels',
  'channelDetail',
  'events',
  'eventDetail',
  'integrations',
  'tutorials'
];

const guestPaths = [
  'login',
  'error'
]

class Routes extends Component {
  render() {
    const { isAuthenticated, location } = this.props;
    let pathname = location.pathname.split('/');

    if (pathname[1] === 'devices' && pathname.length === 3) {
      pathname = 'deviceDetail';
    } else if (pathname[1] === 'events' && pathname.length === 3) {
      pathname = 'eventDetail';
    } else {
      pathname = pathname[1];
    }

    if (isAuthenticated) {
      if (pathname !== '' && userPaths.indexOf(pathname) === -1) {
        console.log(isAuthenticated);
        return (
          <Switch>
            <GuestLayout>
              <Route
                component={Page404}
                location={location}
                path="/error"
              />
              {pathname !=='error' && <Redirect to="/error"/>}
            </GuestLayout>
          </Switch>
        )
      }

      return (
        <Switch>
          <MainLayout pathname={pathname}>
            <Route
              location={location}
              path="/dashboard"
              component={Dashboard}
            />
            <Route
              location={location}
              exact
              path="/devices"
              component={Devices}
            />
            <Route
              location={location}
              exact
              path="/devices/:deviceId"
              component={DeviceDetail}
            />
            <Route
              location={location}
              exact
              path="/channels"
              component={Channels}
            />
            <Route
              location={location}
              exact
              path="/channels/:channelId"
              component={ChannelDetail}
            />
            <Route
              location={location}
              exact
              path="/events"
              component={Events}
            />
            <Route
              location={location}
              exact
              path="/events/:deviceId"
              component={EventDetail}
            />
            <Route
              location={location}
              exact
              path="/integrations"
              component={Integrations}
            />
            {pathname === '' && <Redirect to="/dashboard"/>}
          </MainLayout>
        </Switch>
      )
    }

    return (
      <Switch>
        <GuestLayout>
          <Route
            location={location}
            path="/login"
            component={Login}
          />
          <Route
            component={Page404}
            location={location}
            path="/error"
          />
          {pathname === '' && <Redirect to="/login"/>}
          {pathname !== '' && guestPaths.indexOf(pathname) === -1 && <Redirect to="/error"/>}
        </GuestLayout>
      </Switch>
    );
  }
}

export default Routes;

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
  menuItem: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
});

class SideMenuItem extends Component {
  render() {
    const { classes, icon, selected, text, to } = this.props;
    return (
      <Link
        className={classes.link}
        to={to}
      >
        <MenuItem
          button
          className={classes.menuItem}
          selected={selected}
        >
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
        </MenuItem>
      </Link>
    )
  }
}

SideMenuItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideMenuItem);

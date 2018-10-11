import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from "@material-ui/core/styles/index";

const styles = theme => ({
  root: {
    display: 'block'
  },
});

class ConfirmDialog extends Component {
  state = {
    expanded: null,
    deviceId: '',
  };

  render() {

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClickDismiss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClickDismiss} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.onClickConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ConfirmDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ConfirmDialog);
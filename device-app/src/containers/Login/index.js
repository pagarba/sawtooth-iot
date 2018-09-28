import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import { login } from '../../core/actions/auth';

import { apiKey, appId, vendorName } from '../../config';

const abcui = require('airbitz-core-js-ui')
const styles = theme => ({})

class Login extends Component {
  constructor () {
    super()

    const _abcUI = abcui.makeABCUIContext({
      apiKey,
      appId,
      vendorName,
      bundlePath: 'abcui',
    });

    this.state = {
      _abcUI,
    }
  }

  componentDidMount() {
    this.state._abcUI.openLoginWindow((error, account) => {
      if (error) {
        console.log(error)
      }

      console.log(account);
      this.props.login(account);
    })
  }

  render () {
    const {classes} = this.props

    return (
      <div className={classes.dashboard}>

      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    login: account => dispatch(login(account)),
  }
}

const WithStyles = withStyles(styles)(Login);
export default connect(null, mapDispatchToProps)(WithStyles);
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import { login } from '../../core/actions/auth';

import { apiKey, appId, vendorName } from '../../config';
import axios from 'axios';

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

  login = async (account) => {
    const { loginKey, username } = account;
    const data = {
      email:`${username}@pagarba.io`,
      password: loginKey,
    };

    const response = await axios.post('/tokens', data);
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common.authorization = response.data.token;
    this.props.login(account);
  }

  componentDidMount() {
    this.state._abcUI.openLoginWindow(async (error, account) => {
      if (error) {
        console.log(error)
      }

      console.log(account);
      const { loginKey, username } = account;
      const data = {
        email:`${username}@pagarba.io`,
        password: loginKey,
      };

      try {
        await axios.post('/users', data);
        await this.login(account);
      } catch(e) {
        if (e.response.status === 409) {
          await this.login(account);
        }
      }
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
import { push } from 'react-router-redux';

import constants from '../types';

export const login = account => dispatch => {
  dispatch({
    type: constants.LOGIN_SUCCESS,
    account
  });

  dispatch(push('/dashboard'));
}

export const logout = () => dispatch => {
  dispatch({
    type: constants.LOGOUT_SUCCESS
  });

  dispatch(push('/login'));
}
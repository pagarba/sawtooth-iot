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

  localStorage.removeItem('token');

  dispatch(push('/login'));
}

export const resetAccount = account => dispatch => {
  dispatch({
    type: constants.ACCOUNT_FETCH_SUCCESS,
    account,
  });
}
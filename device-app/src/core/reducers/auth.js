import constants from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        account: action.account,
      };
    case constants.ACCOUNT_FETCH_SUCCESS:
      return {
        ...state,
        account: action.account,
      };
    case constants.LOGOUT_SUCCESS:
      return {
        ...state,
        account: null,
      };
    default:
      return state;
  }
}
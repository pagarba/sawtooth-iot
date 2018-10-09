import { combineReducers } from 'redux';

import auth from './auth';
import device from './device';
import channel from './channel';

export default combineReducers({
  auth,
  device,
  channel,
});
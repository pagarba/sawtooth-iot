import constants from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case constants.GET_CHANNELS_REQUEST:
      return {
        ...state,
        loadingDevices: true,
      }
    case constants.GET_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.payload,
        loadingDevices: false,
      };
    case constants.GET_CHANNELS_FAILURE:
      return {
        ...state,
        loadingDevices: false,
      }
    case constants.GET_CHANNEL_REQUEST:
      return {
        ...state,
        loadingDevices: true,
      }
    case constants.GET_CHANNEL_SUCCESS:
      return {
        ...state,
        channel: action.payload,
        loadingDevices: false,
      };
    case constants.GET_CHANNEL_FAILURE:
      return {
        ...state,
        loadingDevices: false,
      }
    case constants.CREATE_CHANNEL_REQUEST:
      return {
        ...state,
        isCreatingDevice: true,
      }
    case constants.CREATE_CHANNEL_SUCCESS:
      return {
        ...state,
        isCreatingDevice: false,
      }
    case constants.CREATE_CHANNEL_FAILURE:
      return {
        ...state,
        isCreatingDevice: false,
      }
    case constants.EDIT_CHANNEL_REQUEST:
      return {
        ...state,
        isEditingDevice: true,
      }
    case constants.EDIT_CHANNEL_SUCCESS:
      return {
        ...state,
        isEditingDevice: false,
      }
    case constants.EDIT_CHANNEL_FAILURE:
      return {
        ...state,
        isEditingDevice: false,
      }
    case constants.ADD_DEVICE_TO_CHANNEL_REQUEST:
      return {
        ...state,
        isAddingDeviceToChannel: true,
      }
    case constants.ADD_DEVICE_TO_CHANNEL_SUCCESS:
      return {
        ...state,
        isAddingDeviceToChannel: false,
      }
    case constants.ADD_DEVICE_TO_CHANNEL_FAILURE:
      return {
        ...state,
        isAddingDeviceToChannel: false,
      }
    default:
      return state;
  }
}
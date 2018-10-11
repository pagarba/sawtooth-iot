import constants from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case constants.GET_CHANNELS_REQUEST:
      return {
        ...state,
        loadingChannels: true,
      }
    case constants.GET_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.payload,
        loadingChannels: false,
      };
    case constants.GET_CHANNELS_FAILURE:
      return {
        ...state,
        loadingChannels: false,
      }
    case constants.GET_CHANNEL_REQUEST:
      return {
        ...state,
        loadingChannels: true,
      }
    case constants.GET_CHANNEL_SUCCESS:
      return {
        ...state,
        channel: action.payload,
        loadingChannels: false,
      };
    case constants.GET_CHANNEL_FAILURE:
      return {
        ...state,
        loadingChannels: false,
      }
    case constants.CREATE_CHANNEL_REQUEST:
      return {
        ...state,
        isCreatingChannel: true,
      }
    case constants.CREATE_CHANNEL_SUCCESS:
      return {
        ...state,
        isCreatingChannel: false,
      }
    case constants.CREATE_CHANNEL_FAILURE:
      return {
        ...state,
        isCreatingChannel: false,
      }
    case constants.EDIT_CHANNEL_REQUEST:
      return {
        ...state,
        isEditingChannel: true,
      }
    case constants.EDIT_CHANNEL_SUCCESS:
      return {
        ...state,
        isEditingChannel: false,
      }
    case constants.EDIT_CHANNEL_FAILURE:
      return {
        ...state,
        isEditingChannel: false,
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
import constants from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case constants.GET_DEVICES_REQUEST:
      return {
        ...state,
        loadingDevices: true,
      }
    case constants.GET_DEVICES_SUCCESS:
      return {
        ...state,
        devices: action.payload,
        loadingDevices: false,
      };
    case constants.GET_DEVICES_FAILURE:
      return {
        ...state,
        loadingDevices: false,
      }
    case constants.GET_DEVICE_REQUEST:
      return {
        ...state,
        loadingDevices: true,
      }
    case constants.GET_DEVICE_SUCCESS:
      return {
        ...state,
        device: action.payload,
        loadingDevices: false,
      };
    case constants.GET_DEVICE_FAILURE:
      return {
        ...state,
        loadingDevices: false,
      }
    case constants.CREATE_DEVICE_REQUEST:
      return {
        ...state,
        isCreatingDevice: true,
      }
    case constants.CREATE_DEVICE_SUCCESS:
      return {
        ...state,
        isCreatingDevice: false,
      }
    case constants.CREATE_DEVICE_FAILURE:
      return {
        ...state,
        isCreatingDevice: false,
      }
    case constants.EDIT_DEVICE_REQUEST:
      return {
        ...state,
        isEditingDevice: true,
      }
    case constants.EDIT_DEVICE_SUCCESS:
      return {
        ...state,
        isEditingDevice: false,
      }
    case constants.EDIT_DEVICE_FAILURE:
      return {
        ...state,
        isEditingDevice: false,
      }
    default:
      return state;
  }
}
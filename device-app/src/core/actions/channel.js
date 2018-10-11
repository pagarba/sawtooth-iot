import axios from 'axios';

import constants from '../types';


export const createChannel = channel => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.CREATE_CHANNEL_REQUEST,
    });

    axios.post('/channels', channel)
      .then(res => {
        dispatch({
          type: constants.CREATE_CHANNEL_SUCCESS,
          payload: res.data
        });

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.CREATE_CHANNEL_FAILURE,
          payload: error.data
        })

        reject();
      });
  });
}

export const editChannel = (id, channel) => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.EDIT_CHANNEL_REQUEST,
    });

    axios.put(`/channels/${id}`, channel)
      .then(res => {
        dispatch({
          type: constants.EDIT_CHANNEL_SUCCESS,
          payload: res.data
        });

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.EDIT_CHANNEL_FAILURE,
          payload: error.data
        })

        reject();
      });
  });
}

export const getChannels = () => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.GET_CHANNELS_REQUEST,
    });

    axios.get('/channels')
      .then(res => {
        dispatch({
          type: constants.GET_CHANNELS_SUCCESS,
          payload: res.data
        })
        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.GET_CHANNELS_FAILURE,
          payload: error.data
        })
        reject();
      });
  });
}

export const getChannel = (id) => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.GET_CHANNEL_REQUEST,
    });

    axios.get(`/channels/${id}`)
      .then(res => {
        dispatch({
          type: constants.GET_CHANNEL_SUCCESS,
          payload: res.data
        })

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.GET_CHANNEL_FAILURE,
          payload: error.data
        })
        reject();
      });
  });
}

export const deleteChannel = (id) => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.DELETE_CHANNEL_REQUEST,
    });

    axios.delete(`/channels/${id}`)
      .then(res => {
        dispatch({
          type: constants.DELETE_CHANNEL_SUCCESS,
          payload: res.data
        })

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.DELETE_CHANNEL_FAILURE,
          payload: error.data
        })
        reject();
      });
  });
}

export const addDeviceToChannel = (channelId, deviceId) => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.ADD_DEVICE_TO_CHANNEL_REQUEST,
    });

    axios.put(`/channels/${channelId}/things/${deviceId}`)
      .then(res => {
        dispatch({
          type: constants.ADD_DEVICE_TO_CHANNEL_SUCCESS,
          payload: res.data
        })

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.ADD_DEVICE_TO_CHANNEL_FAILURE,
          payload: error.data
        })
        reject();
      });
  });
}

export const deleteDeviceFromChannel = (channelId, deviceId) => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.DELETE_DEVICE_FROM_CHANNEL_REQUEST,
    });

    axios.delete(`/channels/${channelId}/things/${deviceId}`)
      .then(res => {
        dispatch({
          type: constants.DELETE_DEVICE_FROM_CHANNEL_SUCCESS,
          payload: res.data
        })

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.DELETE_DEVICE_FROM_CHANNEL_FAILURE,
          payload: error.data
        })
        reject();
      });
  });
}
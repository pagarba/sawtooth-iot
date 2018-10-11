import axios from 'axios';

import constants from '../types';


export const createDevice = device => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.CREATE_DEVICE_REQUEST,
    });

    axios.post('/things', device)
      .then(res => {
        dispatch({
          type: constants.CREATE_DEVICE_SUCCESS,
          payload: res.data
        });

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.CREATE_DEVICE_FAILURE,
          payload: error.data
        })

        reject();
      });
  });
}

export const editDevice = (id, device) => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.EDIT_DEVICE_REQUEST,
    });

    axios.put(`/things/${id}`, device)
      .then(res => {
        dispatch({
          type: constants.EDIT_DEVICE_SUCCESS,
          payload: res.data
        });

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.EDIT_DEVICE_FAILURE,
          payload: error.data
        })

        reject();
      });
  });
}

export const getDevices = () => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.GET_DEVICES_REQUEST,
    });

    axios.get('/things')
      .then(res => {
        dispatch({
          type: constants.GET_DEVICES_SUCCESS,
          payload: res.data
        })
        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.GET_DEVICES_FAILURE,
          payload: error.data
        })
        reject();
      });
  });
}

export const getDevice = (id) => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.GET_DEVICE_REQUEST,
    });

    axios.get(`/things/${id}`)
      .then(res => {
        dispatch({
          type: constants.GET_DEVICE_SUCCESS,
          payload: res.data
        })

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.GET_DEVICE_FAILURE,
          payload: error.data
        })
        reject();
      });
  });
}

export const deleteDevice = (id) => dispatch => {
  return new Promise(function(resolve, reject) {
    dispatch({
      type: constants.DELETE_DEVICE_REQUEST,
    });

    axios.delete(`/things/${id}`)
      .then(res => {
        dispatch({
          type: constants.DELETE_DEVICE_SUCCESS,
          payload: res.data
        })

        resolve();
      })
      .catch(error => {
        dispatch({
          type: constants.DELETE_DEVICE_FAILURE,
          payload: error.data
        })
        reject();
      });
  });
}
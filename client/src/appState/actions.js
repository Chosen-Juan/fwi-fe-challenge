import {
  FETCH_PLAYERS_SUCCESS,
  CREATE_PLAYER_START,
  CREATE_PLAYER_ERROR,
  CREATE_PLAYER_SUCCESS,
  UPLOAD_IMAGE_START,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_SUCCESS,
  RESET_PLAYER_STORE,
} from './constants';
import api from '../api';

export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export function createPlayerStart() {
  return { type: CREATE_PLAYER_START };
}

export function createPlayerError(error) {
  return { type: CREATE_PLAYER_ERROR, payload: { error } };
}

export function createPlayerSuccess() {
  return { type: CREATE_PLAYER_SUCCESS };
}

export function uploadImageStart() {
  return { type: UPLOAD_IMAGE_START };
}

export function uploadImageSuccess({ data }) {
  return { type: UPLOAD_IMAGE_SUCCESS, payload: { data } };
}

export function uploadImageError(error) {
  return { type: UPLOAD_IMAGE_ERROR, payload: { error } };
}

export function resetPlayerStoreAction() {
  return { type: RESET_PLAYER_STORE };
}

export function createPlayer(player) {
  return function(dispatch) {
    dispatch(createPlayerStart());
    return api.createPlayer(player)
      .then(
        () => dispatch(createPlayerSuccess()),
        error => dispatch(createPlayerError(error))
      );
  }
}

export function uploadImage(file) {
  return function(dispatch) {
    dispatch(uploadImageStart());
    return api.uploadImage(file)
      .then(
        data => dispatch(uploadImageSuccess(data)),
        error => dispatch(uploadImageError(error))
      );
  }
}

export function resetPlayerStore() {
  return function(dispatch) {
    dispatch(resetPlayerStoreAction())
  }
}
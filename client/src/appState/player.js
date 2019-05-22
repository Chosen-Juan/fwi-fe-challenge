import {
  CREATE_PLAYER_START,
  CREATE_PLAYER_ERROR,
  CREATE_PLAYER_SUCCESS,
  UPLOAD_IMAGE_START,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_SUCCESS,
  RESET_PLAYER_STORE,
  EDIT_PLAYER_START,
  EDIT_PLAYER_ERROR,
  EDIT_PLAYER_SUCCESS,
} from './constants';

const initialState = {};

function newPlayerStart(state) {
  return { ...state, loading: true };
}

function newPlayerSuccess(state) {
  return { ...state, loading: false, success: true };
}

function newPlayerError(state, { error }) {
  return { ...state, error, loading: false };
}

function uploadImageStart(state) {
  return { ...state, loading: true };
}

function uploadImageSuccess(state, { url }) {
  return { ...state, loading: false, imageUrl: url };
}

function uploadImageError(state, { error }) {
  return { ...state, error, loading: false };
}

function editPlayerStart(state) {
  return { ...state, loading: true };
}

function editPlayerSuccess(state) {
  return { ...state, loading: false };
}

function editPlayerError(state, { error }) {
  return { ...state, error, loading: false };
}

function resetPlayerStore() {
  return initialState;
}

export default function players(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLAYER_START:
      return newPlayerStart(state);
    case CREATE_PLAYER_SUCCESS:
      return newPlayerSuccess(state);
    case CREATE_PLAYER_ERROR:
      return newPlayerError(state, action.payload.error);
    case UPLOAD_IMAGE_START:
      return uploadImageStart(state);
    case UPLOAD_IMAGE_SUCCESS:
      return uploadImageSuccess(state, action.payload.data);
    case UPLOAD_IMAGE_ERROR:
      return uploadImageError(state, action.payload.error);
    case EDIT_PLAYER_START:
      return editPlayerStart(state);
    case EDIT_PLAYER_SUCCESS:
      return editPlayerSuccess(state);
    case EDIT_PLAYER_ERROR:
      return editPlayerError(state, action.payload.error);
    case RESET_PLAYER_STORE:
      return resetPlayerStore();
    default:
      return state;
  }
}

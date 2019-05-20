import { CREATE_PLAYER_START, CREATE_PLAYER_ERROR, CREATE_PLAYER_SUCCESS } from './constants';

function newPlayerStart(state) {
  return { ...state, loading: true };
}

function newPlayerSuccess(state) {
  return { ...state, loading: false, success: true };
}

function newPlayerError(state, { error }) {
  return { ...state, error, loading: false };
}

export default function players(state = {}, action) {
  switch (action.type) {
    case CREATE_PLAYER_START:
      return newPlayerStart(state);
    case CREATE_PLAYER_SUCCESS:
      return newPlayerSuccess(state);
    case CREATE_PLAYER_ERROR:
      return newPlayerError(state, action.payload.error);
    default:
      return state;
  }
}

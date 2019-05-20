import {
  FETCH_PLAYERS_SUCCESS,
  CREATE_PLAYER_START,
  CREATE_PLAYER_ERROR,
  CREATE_PLAYER_SUCCESS,
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
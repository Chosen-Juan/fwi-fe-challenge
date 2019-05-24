import { FETCH_PLAYERS_SUCCESS, SORT_PLAYERS } from './constants';

function mergePlayers(state, { players, from, size, total }) {
  const newState = { ...state, from, size, total, players };
  return newState;
}

function sortAlphabetically(key, a, b) {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

function sortPlayers(state, { key, direction }) {
  let players = [...state.players].sort(sortAlphabetically.bind(null, key));
  players = direction === 'desc' ? players.reverse() : players;
  return { ...state, players, sort: { key, direction } };
}

const initialState = {
  players: [],
  sort: {},
  from: 0,
  size: 0,
  total: 0,
};

export default function players(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    case SORT_PLAYERS:
      return sortPlayers(state, action.payload.data);
    default:
      return state;
  }
}

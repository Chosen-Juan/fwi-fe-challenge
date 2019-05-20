import { combineReducers } from 'redux';

import playerIds from './playerIds';
import players from './players';
import player from './player';

export default combineReducers({
  playerIds,
  players,
  player,
});

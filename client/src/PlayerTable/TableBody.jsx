import React from 'react';
import PropTypes from 'prop-types';

import { COUNTRIES } from '../constants';
import Player from './Player';

const TableBody = ({ players }) => {
  return (
    <tbody className="table--body">
      {players.map(player => <Player key={player.id} player={player} />)}
    </tbody>
  );
};

TableBody.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBody;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';

import { COUNTRIES } from '../constants';
import { fetchPlayersSuccess } from '../appState/actions';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import api from '../api';

class PlayerTable extends PureComponent {
  static propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        country: PropTypes.oneOf(Object.keys(COUNTRIES)),
        winnings: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
    fetchPlayersSuccess: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchPlayersSuccess } = this.props;
    api.fetchPlayers()
      .then(({ data }) => {
        if (data) {
          fetchPlayersSuccess(data);
          return data;
        }
        throw new Error(data.message);
      });
  }

  render() {
    const { players } = this.props;
    return (
      <table
        aria-label="Poker Players"
        className="table is-scrollable"
      >
        <TableHeader />
        <TableBody players={players} />
      </table>
    );
  }
}

export default connectAdvanced(dispatch => {
  let result;
  const actions = bindActionCreators({ fetchPlayersSuccess }, dispatch);

  return (state, props) => {
    const players = state.playerIds.map(id => state.players[id]);

    const nextResult = { ...props, ...actions, players };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PlayerTable);

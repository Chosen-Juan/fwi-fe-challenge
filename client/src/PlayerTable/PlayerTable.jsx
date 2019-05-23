import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';

import { COUNTRIES } from '../constants';
import { fetchPlayers } from '../appState/actions';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pages from '../Pages/Pages';

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
    fetchPlayers: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchPlayers();
  }

  render() {
    const { players } = this.props;
    return (
      <div className="player-table">
        <Pages />
        <table
          aria-label="Poker Players"
          className="table is-scrollable"
        >
          <TableHeader />
          <TableBody players={players} />
        </table>
      </div>
    );
  }
}

export default connectAdvanced(dispatch => {
  let result;
  const actions = bindActionCreators({ fetchPlayers }, dispatch);

  return (state, props) => {
    const players = state.playerIds.map(id => state.players[id]);
    const { from, size, total } = state;
    const nextResult = { ...props, ...actions, players, from, size, total };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PlayerTable);

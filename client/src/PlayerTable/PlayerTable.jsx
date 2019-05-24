import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { COUNTRIES } from '../constants';
import { fetchPlayers } from '../appState/actions';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pages from '../Pages/Pages';

export class PlayerTable extends PureComponent {
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
        <table aria-label="Poker Players" className="table is-scrollable">
          <TableHeader />
          <TableBody players={players} />
        </table>
      </div>
    );
  }
}
const mapStateToProps = ({ players: { from, size, total, players } }) => ({
  from,
  size,
  total,
  players,
});
const mapDispatchToProps = {
  fetchPlayers,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerTable);

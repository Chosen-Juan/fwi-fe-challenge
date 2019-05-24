import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sortPlayers } from '../../appState/actions';
import './Sort.scss';

export class Sort extends Component {
  static propTypes = {
    playerKey: PropTypes.string.isRequired,
    sortPlayers: PropTypes.func.isRequired,
    sort: PropTypes.shape({
      key: PropTypes.string,
      direction: PropTypes.string,
    }).isRequired,
  };

  state = {
    direction: '',
  };

  changeDirection = cb => {
    const { direction } = this.state;
    if (direction === 'asc') {
      this.setState({ direction: 'desc' }, cb);
    } else {
      this.setState({ direction: 'asc' }, cb);
    }
  };

  sort = () => {
    const { playerKey, sortPlayers } = this.props;
    this.changeDirection(() => {
      const direction = this.state.direction ? this.state.direction : 'asc';
      sortPlayers(playerKey, direction);
    });
  };

  getSymbol = () => {
    const { direction } = this.state;
    if (!direction) {
      return '↕';
    } else if (direction === 'asc') {
      return '↓';
    } else {
      return '↑';
    }
  };

  componentWillReceiveProps({ sort, playerKey }) {
    if (sort.key !== playerKey) {
      this.setState({ direction: '' });
    }
  }

  render() {
    return (
      <button
        className="button is-primary is-small is-outlined"
        onClick={this.sort}
      >
        {this.getSymbol()}
      </button>
    );
  }
}

const mapStateToProps = ({ players: { sort } }) => ({
  sort,
});

const mapDispatchToProps = {
  sortPlayers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sort);

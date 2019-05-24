import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../appState/actions';

import './Pages.scss';

export class Pages extends Component {
  static propTypes = {
    fetchPlayers: PropTypes.func.isRequired,
    from: PropTypes.number,
    size: PropTypes.number,
    total: PropTypes.number,
  };

  state = {
    total: 0,
    size: 25,
    from: 0,
    numberOfPages: 0,
    selectedPage: 0,
  };

  componentWillReceiveProps(props) {
    const { total, from } = props;
    this.setState({
      total, from,
      numberOfPages: Math.ceil(total/this.state.size),
      selectedPage: Math.ceil(from/this.state.size)
    });
  }


  changePage = page => {
    const { size } = this.state;
    const from = page * size;
    this.props.fetchPlayers(from, size);
  };

  nextPage = () => {
    const { selectedPage, numberOfPages } = this.state;
    if(selectedPage >= (numberOfPages - 1)) {
      return;
    }
    this.changePage(selectedPage + 1);
  };

  previousPage = () => {
    const { selectedPage } = this.state;
    if(selectedPage <= 0) {
      return;
    }
    this.changePage(selectedPage - 1);
  };

  getPages = () => {
    const { numberOfPages, selectedPage } = this.state;
    let pages = [];
    for(let x = 0; x < numberOfPages; x++) {
      pages.push(
        <button
          key={x}
          onClick={() => this.changePage(x)}
          className={selectedPage === x ? "button is-primary": "button is-primary is-outlined"}
        >
          {x + 1}
        </button>
      );
    }
    return pages;
  };

  render() {
    return (
      <div className="pages level is-mobile">
        <div className="level-left">
          <button id="button-previous" className="button" onClick={this.previousPage}>{'<'}</button>
        </div>
        <div className="level-item">
          {this.getPages()}
        </div>
        <div className="level-right">
          <button id="button-next" className="button" onClick={this.nextPage}>{'>'}</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ players: { from, size, total} }) => ({
  from, size, total
});

const mapDispatchToProps = {
  fetchPlayers
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);

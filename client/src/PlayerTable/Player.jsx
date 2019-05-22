import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';
import { connect } from 'react-redux'

import Avatar from '../Avatar';
import { COUNTRIES, COUNTRIES_ARRAY } from '../constants';
import { editPlayer } from '../appState/actions';

export class Player extends Component {
  static propTypes = {
    player: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  }

  state = {
    editing: false,
    name: this.props.player.name,
    winnings: this.props.player.winnings,
    country: this.props.player.country,
  };

  setEditing = editing => {
    this.setState({ editing });
  };

  cancelEditing = () => {
    this.setEditing(false);
  }

  saveEdit = () => {
    const { id } = this.props.player;
    const { name, winnings, country } = this.state;
    this.props.editPlayer(id, name, parseInt(winnings), country)
      .then(this.finishEditing);
  }

  finishEditing = () => {
    this.setState({ success: true });
    setTimeout(() => {
      this.setState({ success: false });
      this.setEditing(false);
    }, 3000);
  }

  onChangeHandler = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  renderCountryOptions = () => {
    const options = [
      <option key="default" disabled value>Select a country</option>
    ];
    COUNTRIES_ARRAY.forEach(country => {
      options.push(
        <option key={country.code} value={country.code}>
          {country.value}
        </option>
      );
    });
    return options;
  }

  render() {
    const { player } = this.props;
    return (
      <tr key={player.id} role="row" className="table__row">
        <td>
          <Avatar src={player.imageUrl} />
        </td>
        <td hidden={this.state.editing}>
          {player.name}
        </td>
        <td hidden={!this.state.editing}>
          <input name="name" type="text" className="input" value={this.state.name} onChange={this.onChangeHandler} />
        </td>
        <td hidden={this.state.editing}>
          {player.winnings.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
          })}
        </td>
        <td hidden={!this.state.editing}>
          <input name="winnings" type="number" className="input" value={this.state.winnings} onChange={this.onChangeHandler} />
        </td>
        <td hidden={this.state.editing}>
          <div className="country">
            <Avatar>
              <Flags code={player.country} alt="" />
            </Avatar>
            {player.country}
          </div>
        </td>
        <td hidden={!this.state.editing}>
          <select name="country" className="input" value={this.state.country} onChange={this.onChangeHandler}>
            {this.renderCountryOptions()}
          </select>
        </td>
        <td className={this.state.success ? "notification is-success" : "is-hidden"}>Saved</td>
        <td className={this.state.success ? "is-hidden" : "buttons is-hidden-mobile"}>
          <button className={this.state.editing ? "button is-primary" : "is-hidden"} onClick={this.saveEdit}>Save</button>
          <button className={this.state.editing ? "is-hidden" : "button is-link is-outlined"} onClick={() => this.setEditing(true)}>Edit</button>
          <button className={this.state.editing ? "button is-danger" : "is-hidden"} onClick={this.cancelEditing}>Cancel</button>
          <button className={this.state.editing ? "is-hidden" : "button is-danger is-outlined"}>&times;</button>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = state => ({
  playerStore: state.player
});

const mapDispatchToProps = {
  editPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

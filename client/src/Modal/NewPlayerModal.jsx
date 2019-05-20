import React, { Component } from 'react'
import { connect } from 'react-redux'
import Flags from 'react-world-flags';
import { Formik } from 'formik';

import './NewPlayerModal.scss';
import { COUNTRIES } from '../constants';
import Avatar from '../Avatar';
import { createPlayer } from '../appState/actions';

const sortAlphabetically = (a, b) => {
  if (a.value < b.value) { return -1; }
  if (a.value > b.value) { return 1; }
  return 0;
};
const countriesArray = Object.keys(COUNTRIES)
  .map(k => ({ code: k, value: COUNTRIES[k] }))
  .sort(sortAlphabetically);

export class NewPlayerModal extends Component {

  state = {
    active: false,
    buttonClass: 'is-primary'
  };

  setActive = () => {
    this.setState({ active: !this.state.active });
  };

  componentWillReceiveProps({ player }) {
    let buttonClass;
    if (player.loading) {
      buttonClass = 'is-loading';
    } else if (player.error) {
      buttonClass = 'is-danger';
    } else if (player.success) {
      buttonClass = 'is-success';
    } else {
      buttonClass = 'is-primary';
    }
    this.setState({ buttonClass });
  }

  renderCountryOptions = () => {
    const options = [
      <option key="default" disabled value>Select a country</option>
    ];
    countriesArray.forEach(country => {
      options.push(
        <option key={country.code} value={country.code}>
          {country.value}
        </option>
      );
    });
    return options;
  };

  submit = (values, { setSubmitting }) => {
    const { name, country, winnings } = values;
    setSubmitting(true);
    this.props.createPlayer({ name, country, winnings })
      .then(setSubmitting(false));
  }

  render() {
    return (
      <React.Fragment>
        <button className="button is-primary is-medium is-size-7-mobile" onClick={this.setActive}>New Player</button>
        <div className={this.state.active ? 'modal is-active' : 'modal'}>
          <div className="modal-background" onClick={this.setActive}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add new player</p>
              <button className="delete" aria-label="close" onClick={this.setActive}></button>
            </header>
            <section className="modal-card-body">
              <Formik
                initialValues={{ name: '', winnings: '', country: 'US' }}
                onSubmit={this.submit}
              >
              {
                ({ values, handleChange, isSubmitting, handleBlur, handleSubmit }) =>
                (<form className="form" onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input
                        required
                        className="input"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Winnings</label>
                    <div className="control">
                      <input
                        required
                        className="input"
                        type="number"
                        placeholder="Winnings: $"
                        name="winnings"
                        value={values.winnings}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Nationality</label>
                    <div className="control">
                      <div className="select">
                        <select
                          required
                          name="country"
                          value={values.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {this.renderCountryOptions()}
                        </select>
                      </div>
                      <span hidden={!values.country}>
                        <Avatar>
                          <Flags code={values.country} alt="" />
                        </Avatar>
                      </span>
                    </div>
                  </div>
                  <footer>
                    <button
                      type="submit"
                      className={'button ' + this.state.buttonClass}
                      disabled={isSubmitting}
                    >
                      {this.props.player.success ? 'Saved!' : 'Save'}
                    </button>
                    <button type="button" className="button is-danger" onClick={this.setActive}>Cancel</button>
                  </footer>
                </form>)
              }
              </Formik>
            </section>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  player: state.player
});

const mapDispatchToProps = {
  createPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPlayerModal)

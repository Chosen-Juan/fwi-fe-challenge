import React, { Component } from 'react'
import { connect } from 'react-redux'
import Flags from 'react-world-flags';
import { Formik } from 'formik';

import './NewPlayerModal.scss';
import { COUNTRIES } from '../constants';
import Avatar from '../Avatar';
import { createPlayer, uploadImage, resetPlayerStore } from '../appState/actions';
import { compress } from '../helpers';

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
    buttonClass: 'is-primary',
  };

  defaultValues = {
    name: '',
    winnings: '',
    country: 'US',
  };

  closeModal = callback => {
    if(callback && typeof callback === 'function') {
      callback();
      this.fileInput.value = '';
    }
    this.setState({ active: false });
  };

  setActive = () => {
    this.setState({ active: true });
  }

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


  submit = (values, { setSubmitting, resetForm }) => {
    const successHandler = () => {
      setSubmitting(false);
      resetForm(this.defaultValues);
      this.fileInput.value = '';
      setTimeout(() => this.props.resetPlayerStore(), 3000);
    };
    const { name, country, winnings, pic } = values;
    setSubmitting(true);
    if(pic) {
      compress(pic)
        .then(compressedPic => this.props.uploadImage(compressedPic))
        .then(() => {
          const { imageUrl } = this.props.player;
          return this.props.createPlayer({ name, country, winnings, imageUrl })
        })
        .then(successHandler);
    } else {
      this.props.createPlayer({ name, country, winnings })
        .then(successHandler);
    }
  }

  render() {
    return (
      <React.Fragment>
        <button className="button is-primary is-medium is-size-7-mobile" onClick={this.setActive}>New Player</button>
        <div className={this.state.active ? 'modal is-active' : 'modal'}>
          <div className="modal-background" onClick={this.closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add new player</p>
              <button className="delete" aria-label="close" onClick={this.closeModal}></button>
            </header>
            <section className="modal-card-body">
              <Formik
                initialValues={this.defaultValues}
                onSubmit={this.submit}
              >
              {
                ({
                  values,
                  handleChange,
                  isSubmitting,
                  handleBlur,
                  handleReset,
                  handleSubmit,
                  setFieldValue,
                }) =>
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
                  <div className="field">
                    <label className="label">Picture</label>
                    <input
                      className="input"
                      id="pic"
                      name="pic"
                      type="file"
                      onChange={event => {
                        setFieldValue("pic", event.currentTarget.files[0]);
                      }}
                      ref={ref => this.fileInput = ref}
                    />
                  </div>
                  <footer>
                    <button
                      type="submit"
                      className={'button ' + this.state.buttonClass}
                      disabled={isSubmitting}
                    >
                      {this.props.player.success ? 'Saved!' : 'Save'}
                    </button>
                    <button type="button" className="button is-danger" onClick={() => this.closeModal(handleReset)}>Cancel</button>
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
  createPlayer, uploadImage, resetPlayerStore
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPlayerModal)

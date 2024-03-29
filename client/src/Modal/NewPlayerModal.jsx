import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Flags from 'react-world-flags';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import './Modal.scss';
import { COUNTRIES_ARRAY } from '../constants';
import Avatar from '../Avatar';
import { createPlayer, uploadImage, resetPlayerStore } from '../appState/actions';
import { compress } from '../helpers';


export class NewPlayerModal extends Component {

  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
    resetPlayerStore: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    playerStore: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      imageUrl: PropTypes.string
    })
  };

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

  componentWillReceiveProps({ playerStore }) {
    let buttonClass;
    if (playerStore.loading) {
      buttonClass = 'is-loading';
    } else if (playerStore.error) {
      buttonClass = 'is-danger';
    } else if (playerStore.success) {
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
    COUNTRIES_ARRAY.forEach(country => {
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
          const { imageUrl } = this.props.playerStore;
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
      <Fragment>
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
                      {this.props.playerStore.success ? 'Saved!' : 'Save'}
                    </button>
                    <button type="button" className="button is-danger" onClick={() => this.closeModal(handleReset)}>Cancel</button>
                  </footer>
                </form>)
              }
              </Formik>
            </section>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  playerStore: state.player
});

const mapDispatchToProps = {
  createPlayer, uploadImage, resetPlayerStore
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPlayerModal);

import React from 'react';
import { shallow } from 'enzyme';

import { NewPlayerModal } from './NewPlayerModal';

describe('NewPlayerModal', () => {
  const createPlayerMock = jest.fn();
  const resetPlayerStoreMock = jest.fn();
  const uploadImageMock = jest.fn();
  const defaultProps = {
    createPlayer: createPlayerMock,
    resetPlayerStore: resetPlayerStoreMock,
    uploadImage: uploadImageMock,
    playerStore: {
      loading: false,
      error: null,
      imageUrl: null,
    },
  };
  const modal = shallow(<NewPlayerModal {...defaultProps} />);

  it('should match snapshot', () => {
    expect(modal).toMatchSnapshot();
  });

  it('should not be active', () => {
    expect(modal.state('active')).toBe(false);
  });

});

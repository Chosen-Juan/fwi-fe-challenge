import React from 'react';
import { shallow } from 'enzyme';

import { Player } from './Player';

describe('Player', () => {
  const editPlayerMock = jest.fn(() => Promise.resolve());
  const deletePlayerMock = jest.fn();
  const defaultProps = {
    player: {
      id: '1one',
      name: 'Jon Doe',
      country: 'US',
      winnings: 24999,
      imageUrl: ''
    },
    editPlayer: editPlayerMock,
    deletePlayer: deletePlayerMock,
  };
  const player = shallow(<Player {...defaultProps} />);

  it('should match snapshot', () => {
    expect(player).toMatchSnapshot();
  });

  it('should set editing on and off', () => {
    const editButton = player.find('.button.is-link');
    const cancelButton = player.find('.button.is-danger').at(0);
    editButton.simulate('click');
    expect(player.state('editing')).toEqual(true);
    cancelButton.simulate('click');
    expect(player.state('editing')).toEqual(false);
  });

  it('should call edit player', () => {
    const saveButton = player.find('.button.is-primary').at(1);
    saveButton.simulate('click');
    expect(editPlayerMock).toHaveBeenCalledTimes(1);
  });

});

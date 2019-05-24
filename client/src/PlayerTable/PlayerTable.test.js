import React from 'react';
import { shallow } from 'enzyme';

import { PlayerTable } from './PlayerTable';

describe('PlayerTable', () => {
  const fetchPlayersMock = jest.fn();
  const defaultProps = {
    players: [{
      id: '1one',
      name: 'Jon Doe',
      country: 'US',
      winnings: 24999,
      imageUrl: ''
    }],
    fetchPlayers: fetchPlayersMock
  };
  const playerTable = shallow(<PlayerTable {...defaultProps} />);

  it('should match snapshot', () => {
    expect(playerTable).toMatchSnapshot();
  });

  it('should have called fetch players', () => {
    expect(fetchPlayersMock).toHaveBeenCalledTimes(1);
  });

});

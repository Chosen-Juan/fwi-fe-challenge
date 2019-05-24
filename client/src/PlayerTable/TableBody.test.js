import React from 'react';
import { shallow } from 'enzyme';

import TableBody from './TableBody';

describe('TableBody', () => {
  const defaultProps = {
    players: [{
      id: '1one',
      name: 'Jon Doe',
      country: 'US',
      winnings: 24999,
      imageUrl: ''
    }]
  };
  const tableBody = shallow(<TableBody {...defaultProps} />);

  it('should match snapshot', () => {
    expect(tableBody).toMatchSnapshot();
  });

});

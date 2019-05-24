import React from 'react';
import { shallow } from 'enzyme';

import { Sort } from './Sort';

describe('Sort', () => {
  const sortPlayersMock = jest.fn();
  const defaultProps = {
    sort: {
      key: 'name',
      direction: 'asc',
    },
    playerKey: 'name',
    sortPlayers: sortPlayersMock,
  };
  const sort = shallow(<Sort {...defaultProps} />);

  it('should match snapshot', () => {
    expect(sort).toMatchSnapshot();
  });

  it('should call sort players', () => {
    const button = sort.find('.button');
    button.simulate('click');
    expect(sortPlayersMock).toHaveBeenCalledTimes(1);
  });

  it('should switch direction back and forth', () => {
    const button = sort.find('.button');
    expect(sort.state('direction')).toEqual('asc');
    button.simulate('click');
    expect(sort.state('direction')).toEqual('desc');
    button.simulate('click');
    expect(sort.state('direction')).toEqual('asc');
  });
});

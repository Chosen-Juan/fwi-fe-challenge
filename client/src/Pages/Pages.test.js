import React from 'react';
import { shallow } from 'enzyme';

import { Pages } from './Pages';

describe('Pages', () => {
  const numberOfPages = 4;
  const fetchPlayersMock = jest.fn();
  const defaultProps = {
    fetchPlayers: fetchPlayersMock,
    from: 0,
    total: 100
  };
  const willReceivePropsSpy = jest.spyOn(Pages.prototype, 'componentWillReceiveProps');
  const pages = shallow(<Pages {...defaultProps} />);
  pages.setProps(defaultProps);

  it('should match snapshot', () => {
    expect(pages).toMatchSnapshot();
  });

  it('should have exact number of pages', () => {
    expect(willReceivePropsSpy).toHaveBeenCalledTimes(1);
    expect(pages.state('numberOfPages')).toEqual(numberOfPages);
  });

});

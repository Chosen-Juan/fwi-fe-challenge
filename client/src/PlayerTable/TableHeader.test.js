import React from 'react';
import { shallow } from 'enzyme';

import TableHeader from './TableHeader';

describe('TableHeader', () => {
  const tableHeader = shallow(<TableHeader />);

  it('should match snapshot', () => {
    expect(tableHeader).toMatchSnapshot();
  });

});

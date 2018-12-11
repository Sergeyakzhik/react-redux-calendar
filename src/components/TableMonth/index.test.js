import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TableMonth from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('TableMonth', () => {
  const props = {
    tableRows: [],
    tableHeader: [],
    date: 'date',
  };

  const component = shallow(<TableMonth {...props} />);

  it('renders TableMonth component', () => {
    expect(component).toMatchSnapshot();
  });

  it('checks TableMonth date', () => {
    expect(component.find('h2').text()).toEqual('date');
  });
});

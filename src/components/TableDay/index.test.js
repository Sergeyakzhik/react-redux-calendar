import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import TableDay from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('TableDay', () => {
  let props = {
    tableRows: [],
    date: 'date'
  }

  let component = shallow(<TableDay {...props} />);

  it('renders TableDay component', () => {
    expect(component).toMatchSnapshot();
  })

  it('checks TableDay date', () => {
    expect(component.find('h2').text()).toEqual('date');
  })
})

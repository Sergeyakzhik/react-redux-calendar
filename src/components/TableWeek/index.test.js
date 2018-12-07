import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import TableWeek from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('TableWeek', () => {
  let props = {
    tableRows: [],
    tableHeader: [],
    date: 'date'
  }

  let component = shallow(<TableWeek {...props} />);

  it('renders TableWeek component', () => {
    expect(component).toMatchSnapshot();
  })

  it('checks TableWeek date', () => {
    expect(component.find('h2').text()).toEqual('date');
  })
})

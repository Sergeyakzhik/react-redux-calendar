import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import EventInfoField from './index';

import moment from "moment";

Enzyme.configure({ adapter: new Adapter() })

describe('EventInfoField', () => {
  const date = moment();
  let props = {
    style: {},
    event: {
      name: 'new Event',
      startDate: date,
      endDate: date
    }
  }
  let component;

  beforeEach(()=>{
    component = shallow(<EventInfoField {...props} />)
  })

  it('renders EventInfoField component', () => {
    expect(component).toMatchSnapshot();
  })

  it('checks EventInfoField name', () => {
    expect(component.find('h5').text()).toEqual('new Event');
  })
})

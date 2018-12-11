import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import moment from 'moment';
import ShowMoreField from './index';


Enzyme.configure({ adapter: new Adapter() });

describe('ShowMoreField', () => { // FIX: ShowMoreField component
  const date = moment();
  const props = {
    events: {
      event1: {
        name: 'new Event',
        startDate: date,
        endDate: date,
      },
      event2: {
        name: 'new Event2',
        startDate: date,
        endDate: date,
      },
    },
  };
  let component;

  beforeEach(() => {
    component = shallow(<ShowMoreField {...props} />);
  });

  it('renders ShowMoreField component', () => {
    expect(component).toMatchSnapshot();
  });

  it('checks ShowMoreField name', () => {
    expect(component.find('h1').text()).toEqual(date.format('MMMM Do YYYY'));
  });
});

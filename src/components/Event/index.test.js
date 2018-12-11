import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Event from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Event', () => {
  const props = {
    style: {},
    targetKey: '',
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
    onDeleteButtonClick: () => {},
    event: { name: 'new Event' },
  };
  let component;

  beforeEach(() => {
    component = shallow(<Event {...props} />);
  });

  it('renders Event component', () => {
    expect(component).toMatchSnapshot();
  });

  it('checks event name', () => {
    expect(component.find('h4').text()).toEqual('new Event');
  });
});

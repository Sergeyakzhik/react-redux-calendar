import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EventDragger from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('EventDragger', () => {
  const props = {
    style: {},
    targetKey: '',
    onMouseUp: () => {},
    onMouseDown: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
  };
  const component = shallow(<EventDragger {...props} />);

  it('renders EventDragger component', () => {
    expect(component).toMatchSnapshot();
  });
});

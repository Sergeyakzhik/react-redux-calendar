import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import EventResizer from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('EventResizer', () => {
  let props = {
    style: {},
    targetKey: '',
    onMouseUp: () => {},
    onMouseDown: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
  }

  let component = shallow(<EventResizer {...props} />);

  it('renders EventResizer component', () => {
    expect(component).toMatchSnapshot();
  })
})

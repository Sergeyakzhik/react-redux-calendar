import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import StyleToggler from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('StyleToggler', () => {
  const props = {
    style: {},
    onStyleTogglerClick: () => {},
  };
  const component = shallow(<StyleToggler {...props} />);

  it('renders StyleToggler component', () => {
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PeriodToggler from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('PeriodToggler', () => {
  const props = {
    onPeriodTogglerClick: () => {},
  };

  const component = shallow(<PeriodToggler {...props} />);

  it('renders PeriodToggler component', () => {
    expect(component).toMatchSnapshot();
  });
});

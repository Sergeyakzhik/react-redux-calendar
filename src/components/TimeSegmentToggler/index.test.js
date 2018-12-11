import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TimeSegmentToggler from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('TimeSegmentToggler', () => {
  const props = {
    onPeriodChange: () => {},
  };
  const component = shallow(<TimeSegmentToggler {...props} />);

  it('renders TimeSegmentToggler component', () => {
    expect(component).toMatchSnapshot();
  });
});

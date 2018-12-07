import { CHANGE_STYLE } from '../../../constants/action-types';
import { changeStyle } from '../style';

describe('EventTransformation', () => {
  it('changes style', () => {
    const style = '';
    const expectedAction = {
      type: CHANGE_STYLE,
      payload: style
    }
    expect(changeStyle(style)).toEqual(expectedAction);
  })
})

import { CHANGE_STYLE } from '../../../constants/action-types';
import { changeStyle } from '../styleAction';

describe('EventTransformation', () => {
  it('changeStyle()', () => {
    const style = '';
    const expectedAction = {
      type: CHANGE_STYLE,
      payload: style
    }
    expect(changeStyle(style)).toEqual(expectedAction);
  })
})

import { CHANGE_CURRENT_ACTION } from '../../../constants/action-types';
import { changeCurAction } from '../eventTransformerActions';

describe('EventTransformation', () => {
  it('changeCurAction()', () => {
    const action = '';
    const expectedAction = {
      type: CHANGE_CURRENT_ACTION,
      payload: action
    }
    expect(changeCurAction(action)).toEqual(expectedAction);
  })
})

import { CHANGE_CURRENT_ACTION } from '../../../constants/action-types';
import { changeCurAction } from '../eventTransformer';

describe('EventTransformation', () => {
  it('changes current action', () => {
    const action = '';
    const expectedAction = {
      type: CHANGE_CURRENT_ACTION,
      payload: action,
    };
    expect(changeCurAction(action)).toEqual(expectedAction);
  });
});

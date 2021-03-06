import { CHANGE_CURRENT_ACTION } from '../../../constants/action-types';
import { eventTransformerReducer } from '../eventTransformer';

describe('EventTransformerReducer', () => {
  it('changes current action', () => {
    const action = {
      type: CHANGE_CURRENT_ACTION,
      payload: 'drag',
    };
    expect(eventTransformerReducer(initialState, action)).toEqual({
      ...initialState,
      curAction: action.payload,
    });
  });

  it('default', () => {
    const action = {};
    expect(eventTransformerReducer(initialState, action)).toEqual({
      curAction: '',
    });
  });
});

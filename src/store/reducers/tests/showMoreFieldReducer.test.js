import { TOGGLE_SHOW_MORE_FIELD } from '../../../constants/action-types';
import { showMoreFieldReducer, initialState } from '../showMoreField';

describe('ShowMoreFieldReducer', () => {
  it('toggles ShowMoreField', () => {
    const action = {
      type: TOGGLE_SHOW_MORE_FIELD,
      payload: {
        isActive: true,
        events: {},
      },
    };
    expect(showMoreFieldReducer(initialState, action)).toEqual({
      isActive: action.payload.isActive,
      events: action.payload.events,
    });
  });

  it('default', () => {
    const action = {};
    expect(showMoreFieldReducer(initialState, action)).toEqual({
      isActive: false,
      events: [],
    });
  });
});

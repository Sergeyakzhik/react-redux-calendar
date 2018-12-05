import { CHANGE_STYLE } from '../../../constants/action-types';
import { styleReducer, initialState } from '../styleReducer';

describe('StyleReducer', () => {
  it('CHANGE_STYLE', () => {
    const action = {
      type: CHANGE_STYLE,
      payload: 'style1'
    }
    expect(styleReducer(initialState, action)).toEqual({
      style: action.payload
    });
  })

  it('default', () => {
    const action = {}
    expect(styleReducer(initialState, action)).toEqual({
      style: 'style2'
    });
  })
})

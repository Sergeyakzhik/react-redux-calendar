import {
  TOGGLE_EVENT_INFO_FIELD,
  CHANGE_POSITION
} from '../../../constants/action-types';
import { eventInfoFieldReducer, initialState } from '../eventInfoField';

describe('EventInfoFieldReducer', () => {
  it('toggles EventInfoField', () => {
    const action = {
      type: TOGGLE_EVENT_INFO_FIELD,
      payload: 'true'
    }
    expect(eventInfoFieldReducer(initialState, action)).toEqual({
      ...initialState,
      curTarget: action.payload
    });
  })

  it('changes position', () => {
    const action = {
      type: CHANGE_POSITION,
      payload: {
        posX: 20,
        posY: 30
      }
    }
    expect(eventInfoFieldReducer(initialState, action)).toEqual({
      ...initialState,
      posX: action.payload.posX,
      posY: action.payload.posY
    });
  })

  it('default', () => {
    const action = {}
    expect(eventInfoFieldReducer(initialState, action)).toEqual({
      curTarget: '',
      posX: '',
      posY: ''
    });
  })
})

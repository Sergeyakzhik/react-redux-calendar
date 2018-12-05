import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  SET_INITIAL_DATE
} from '../../../constants/action-types';
import { eventFieldReducer, initialState } from '../eventFieldReducer';

describe('AddEventFieldReducer', () => {
  it('OPEN_EVENT_FIELD', () => {
    const action = {
      type: OPEN_EVENT_FIELD,
      payload: true
    }
    expect(eventFieldReducer(initialState, action)).toEqual({
      ...initialState,
      isActive: action.payload
    });
  })

  it('CLOSE_EVENT_FIELD', () => {
    const action = {
      type: CLOSE_EVENT_FIELD,
      payload: false
    }
    expect(eventFieldReducer(initialState, action)).toEqual({
      ...initialState,
      isActive: action.payload
    });
  })

  it('SET_INITIAL_DATE', () => {
    const action = {
      type: SET_INITIAL_DATE,
      payload: {}
    }
    expect(eventFieldReducer(initialState, action)).toEqual({
      ...initialState,
      event: {
        initialDate: action.payload
      }
    });
  })

  it('default', () => {
    const action = {}
    expect(eventFieldReducer(initialState, action)).toEqual({
      isActive: false,
      event: {
        initialDate: ''
      }
    });
  })
})

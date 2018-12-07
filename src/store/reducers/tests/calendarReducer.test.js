import {
  TOGGLE_TIME_SEGMENT,
  CHANGE_PERIOD,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT
} from '../../../constants/action-types';
import { calendarReducer, initialState } from '../calendar';

import moment from "moment";


const date = moment();
const testEvent = {
  name: 'testEvent',
  startDate: date,
  endDate: date
}
const testEventKey = 'testEvent' + date.toString() + date.toString();

describe('CalendarReducer', () => {
  it('adds event', () => {
    const action = {
      type: ADD_EVENT,
      payload: testEvent
    }
    expect(calendarReducer(initialState, action)).toEqual({
      ...initialState,
      events: {
        [
          'testEvent' +
          date.toString() +
          date.toString()
        ]: action.payload
      }
    });
  })

  it('deletes event', () => {
    let state = Object.assign({}, { ...initialState, events: { [testEventKey]: testEvent } })

    const action = {
      type: DELETE_EVENT,
      payload: 'testEvent' + date.toString() + date.toString()
    }

    expect(calendarReducer(state, action)).toEqual({
      ...state,
      events: {}
    });
  })

  it('updates event', () => {
    let state = Object.assign({}, { ...initialState, events: { [testEventKey]: testEvent } })

    const action = {
      type: UPDATE_EVENT,
      payload: {
        targetKey: testEventKey,
        newEvent: Object.assign({}, { ...testEvent, name: 'updatedEvent' })
      }
    }

    const updatedEventKey = 'updatedEvent' + date.toString() + date.toString();

    expect(calendarReducer(state, action)).toEqual({
      ...state,
      events: { [updatedEventKey]: { ...testEvent, name: 'updatedEvent', targetKey: updatedEventKey } }
    });
  })

  it('toggles time segment', () => {
    const action = {
      type: TOGGLE_TIME_SEGMENT,
      payload: 'week'
    }

    expect(calendarReducer(initialState, action)).toEqual({
      ...initialState,
      table: action.payload
    });
  })

  it('changes period', () => {
    const action = {
      type: CHANGE_PERIOD,
      payload: date.toString()
    }

    expect(calendarReducer(initialState, action)).toEqual({
      ...initialState,
      period: action.payload
    });
  })

  it('default', () => {
    const action = {}
    expect(calendarReducer(initialState, action)).toEqual({
      table: 'Month',
      period: initialState.period,
      events: {}
    });
  })
})

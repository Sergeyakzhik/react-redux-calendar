import {
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT
} from '../../../constants/action-types';
import {
  addEvent,
  deleteEvent,
  updateEvent
} from '../calendarActions';

describe('CalendarActions', () => {
  it('addEvent()', () => {
    const event = {};
    const expectedAction = {
      type: ADD_EVENT,
      payload: event
    }
    expect(addEvent(event)).toEqual(expectedAction);
  })

  it('deleteEvent()', () => {
    const target = '';
    const expectedAction = {
      type: DELETE_EVENT,
      payload: target
    }
    expect(deleteEvent(target)).toEqual(expectedAction);
  })

  it('updateEvent()', () => {
    const targetKey = '';
    const newEvent = {};
    const expectedAction = {
      type: UPDATE_EVENT,
      payload: {
        targetKey,
        newEvent
      }
    }
    expect(updateEvent(targetKey, newEvent)).toEqual(expectedAction);
  })
})

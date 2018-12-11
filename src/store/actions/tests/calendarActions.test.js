import {
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  CHANGE_PERIOD,
  TOGGLE_TIME_SEGMENT,
} from '../../../constants/action-types';
import {
  addEvent,
  deleteEvent,
  updateEvent,
  changeTimePeriod,
  toggleTimeSegment,
} from '../calendar';

describe('CalendarActions', () => {
  it('adds event', () => {
    const event = {};
    const expectedAction = {
      type: ADD_EVENT,
      payload: event,
    };
    expect(addEvent(event)).toEqual(expectedAction);
  });

  it('deletes event', () => {
    const target = '';
    const expectedAction = {
      type: DELETE_EVENT,
      payload: target,
    };
    expect(deleteEvent(target)).toEqual(expectedAction);
  });

  it('updates event', () => {
    const targetKey = '';
    const newEvent = {};
    const expectedAction = {
      type: UPDATE_EVENT,
      payload: {
        targetKey,
        newEvent,
      },
    };
    expect(updateEvent(targetKey, newEvent)).toEqual(expectedAction);
  });

  it('changes time period', () => {
    const period = '';
    const expectedAction = {
      type: CHANGE_PERIOD,
      payload: period,
    };
    expect(changeTimePeriod(period)).toEqual(expectedAction);
  });

  it('toggles time segment', () => {
    const segment = '';
    const expectedAction = {
      type: TOGGLE_TIME_SEGMENT,
      payload: segment,
    };
    expect(toggleTimeSegment(segment)).toEqual(expectedAction);
  });
});

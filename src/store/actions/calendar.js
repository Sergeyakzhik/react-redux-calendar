import {
  TOGGLE_TIME_SEGMENT,
  CHANGE_PERIOD,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
} from '../../constants/action-types';

export const addEvent = event => ({
  type: ADD_EVENT,
  payload: event,
});

export const deleteEvent = curTarget => ({
  type: DELETE_EVENT,
  payload: curTarget,
});

export const updateEvent = (targetKey, newEvent) => ({
  type: UPDATE_EVENT,
  payload: {
    targetKey,
    newEvent,
  },
});

export const changeTimePeriod = period => ({
  type: CHANGE_PERIOD,
  payload: period,
});

export const toggleTimeSegment = table => ({
  type: TOGGLE_TIME_SEGMENT,
  payload: table,
});

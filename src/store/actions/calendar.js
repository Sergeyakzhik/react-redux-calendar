import {
  TOGGLE_TIME_SEGMENT,
  CHANGE_PERIOD,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  SET_INITIAL_DATE,
  CLEAR_EVENT_DATA,
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

export const openEditEventField = (isActive, usage, event) => ({
  type: OPEN_EVENT_FIELD,
  payload: {
    isActive,
    usage,
    event,
  },
});

export const closeEditEventField = isActive => ({
  type: CLOSE_EVENT_FIELD,
  payload: isActive,
});

export const setInitialDate = initialDate => ({
  type: SET_INITIAL_DATE,
  payload: initialDate,
});

export const clearEventData = () => ({
  type: CLEAR_EVENT_DATA,
});

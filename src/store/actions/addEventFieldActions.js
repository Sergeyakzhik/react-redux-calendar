import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  ADD_EVENT,
  CHANGE_EVENT_NAME,
  CHANGE_EVENT_DESCRIPTION,
  CHANGE_EVENT_PLACE,
  CHANGE_LENGTH
} from '../../constants/action-types';

export let openAddEventField = isActive => ({
  type: OPEN_EVENT_FIELD,
  payload: isActive
});

export let closeAddEventField = isActive => ({
  type: CLOSE_EVENT_FIELD,
  payload: isActive
});

export let changeStartDate = (startDate, endDate) => ({
  type: CHANGE_START_DATE,
  payload: {
    startDate,
    endDate
  }
});

export let changeEndDate = (startDate, endDate) => ({
  type: CHANGE_END_DATE,
  payload: {
    startDate,
    endDate
  }
});

export let changeLength = length => ({
  type: CHANGE_LENGTH,
  payload: length
});

export let addEvent = (isActive, event) => ({
  type: ADD_EVENT,
  payload: {
    isActive,
    event
  }
});

export let changeEventName = name => ({
  type: CHANGE_EVENT_NAME,
  payload: name
});

export let changeEventDescription = description => ({
  type: CHANGE_EVENT_DESCRIPTION,
  payload: description
});

export let changeEventPlace = place => ({
  type: CHANGE_EVENT_PLACE,
  payload: place
});

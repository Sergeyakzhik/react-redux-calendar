import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  ADD_EVENT,
  DELETE_EVENT,
  CHANGE_EVENT_NAME,
  CHANGE_EVENT_DESCRIPTION,
  CHANGE_EVENT_PLACE
} from '../../constants/action-types';

export let openAddEventField = isActive => ({
  type: OPEN_EVENT_FIELD,
  payload: isActive
});

export let closeAddEventField = isActive => ({
  type: CLOSE_EVENT_FIELD,
  payload: isActive
});

export let changeStartDate = startDate => ({
  type: CHANGE_START_DATE,
  payload: startDate
});

export let changeEndDate = endDate => ({
  type: CHANGE_END_DATE,
  payload: endDate
});

export let addEvent = (isActive, event) => ({
  type: ADD_EVENT,
  payload: {
    isActive,
    event
  }
});

export let deleteEvent = curTarget => ({
  type: DELETE_EVENT,
  payload: curTarget
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

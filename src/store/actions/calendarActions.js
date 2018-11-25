import {
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT
} from '../../constants/action-types';

export let addEvent = event => ({
  type: ADD_EVENT,
  payload: event
});

export let deleteEvent = curTarget => ({
  type: DELETE_EVENT,
  payload: curTarget
});

export let updateEvent = (targetKey, newEvent) => ({
  type: UPDATE_EVENT,
  payload: {
    targetKey,
    newEvent
  }
});

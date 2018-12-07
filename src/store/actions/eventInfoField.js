import {
  TOGGLE_EVENT_INFO_FIELD,
  CHANGE_POSITION
} from '../../constants/action-types.js';

export let toggleEventInfoField = curTarget => ({
  type: TOGGLE_EVENT_INFO_FIELD,
  payload: curTarget
});

export let changeEventInfoPosition = (posX, posY) => ({
  type: CHANGE_POSITION,
  payload: {
    posX,
    posY
  }
});

import {
  TOGGLE_EVENT_INFO_FIELD,
  CHANGE_POSITION,
} from '../../constants/action-types';

export const toggleEventInfoField = curTarget => ({
  type: TOGGLE_EVENT_INFO_FIELD,
  payload: curTarget,
});

export const changeEventInfoPosition = (posX, posY) => ({
  type: CHANGE_POSITION,
  payload: {
    posX,
    posY,
  },
});

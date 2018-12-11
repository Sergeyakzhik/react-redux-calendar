import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  SET_INITIAL_DATE,
} from '../../constants/action-types';

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

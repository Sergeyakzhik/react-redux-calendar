import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  SET_INITIAL_DATE
} from '../../constants/action-types';

export let openAddEventField = isActive => ({
  type: OPEN_EVENT_FIELD,
  payload: isActive
});

export let closeAddEventField = isActive => ({
  type: CLOSE_EVENT_FIELD,
  payload: isActive
});

export let setInitialDate = initialDate => ({
  type: SET_INITIAL_DATE,
  payload: initialDate
});

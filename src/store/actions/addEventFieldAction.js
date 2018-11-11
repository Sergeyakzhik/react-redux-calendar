import { TOGGLE_EVENT_FIELD } from '../../constants/action-types';

export let toggleAddEventField = isActive => ({
  type: TOGGLE_EVENT_FIELD,
  payload: isActive
});

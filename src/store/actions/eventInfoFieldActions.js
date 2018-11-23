import { TOGGLE_EVENT_INFO_FIELD } from '../../constants/action-types';

export let toggleEventInfoField = curTarget => ({
  type: TOGGLE_EVENT_INFO_FIELD,
  payload: curTarget
});

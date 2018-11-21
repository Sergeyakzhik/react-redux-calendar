import { TOGGLE_EVENT_INFO_FIELD } from '../../constants/action-types';

export let toggleEventInfoField = (isActive, target) => ({
  type: TOGGLE_EVENT_INFO_FIELD,
  payload: {
    isActive,
    target
  }
});

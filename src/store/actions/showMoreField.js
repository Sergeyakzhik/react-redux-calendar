import { TOGGLE_SHOW_MORE_FIELD } from '../../constants/action-types';

export let toggleShowMoreField = (isActive, events) => ({
  type: TOGGLE_SHOW_MORE_FIELD,
  payload: {
    isActive,
    events
  }
});

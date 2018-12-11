import { TOGGLE_SHOW_MORE_FIELD } from '../../constants/action-types';

export const toggleShowMoreField = (isActive, events) => ({
  type: TOGGLE_SHOW_MORE_FIELD,
  payload: {
    isActive,
    events,
  },
});

import { OPEN_SHOW_MORE_FIELD } from '../../constants/action-types';

export let openShowMoreField = (isOpened, events) => ({
  type: OPEN_SHOW_MORE_FIELD,
  payload: {
    isOpened,
    events
  }
});

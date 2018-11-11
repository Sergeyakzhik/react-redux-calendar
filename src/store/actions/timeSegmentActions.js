import { TOGGLE_TIME_SEGMENT } from '../../constants/action-types';

export let toggleTimeSegment = table => ({
  type: TOGGLE_TIME_SEGMENT,
  payload: table
});

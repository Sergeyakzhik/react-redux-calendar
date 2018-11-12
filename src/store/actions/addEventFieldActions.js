import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  CHANGE_START_DATE,
  CHANGE_END_DATE
} from '../../constants/action-types';

export let openAddEventField = (isActive, startDate, endDate) => ({
  type: OPEN_EVENT_FIELD,
  payload: { isActive, startDate, endDate }
});

export let closeAddEventField = isActive => ({
  type: CLOSE_EVENT_FIELD,
  payload: isActive
});

export let changeStartDate = startDate => ({
  type: CHANGE_START_DATE,
  payload: startDate
});

export let changeEndDate = endDate => ({
  type: CHANGE_END_DATE,
  payload: endDate
});

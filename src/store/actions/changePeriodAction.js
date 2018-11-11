import { CHANGE_PERIOD } from '../../constants/action-types';

export let changeTimePeriod = period => ({
  type: CHANGE_PERIOD,
  payload: period
});

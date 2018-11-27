import { CHANGE_CURRENT_ACTION } from '../../constants/action-types';

export let changeCurAction = action => ({
  type: CHANGE_CURRENT_ACTION,
  payload: action
});

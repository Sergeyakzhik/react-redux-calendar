import { CHANGE_CURRENT_ACTION } from '../../constants/action-types';

export const changeCurAction = action => ({
  type: CHANGE_CURRENT_ACTION,
  payload: action,
});

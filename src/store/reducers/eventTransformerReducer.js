import { CHANGE_CURRENT_ACTION } from '../../constants/action-types.js';

const initialState = {
  curAction: ''
}

export function eventTransformerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENT_ACTION:
      return {
        curAction: action.payload
      }
    default:
      return state;
  }
}

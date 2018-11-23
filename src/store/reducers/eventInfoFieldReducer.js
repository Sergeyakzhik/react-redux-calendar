import { TOGGLE_EVENT_INFO_FIELD } from '../../constants/action-types.js';

const initialState = {
  curTarget: ''
}

export function eventInfoFieldReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EVENT_INFO_FIELD:
      return {
        curTarget: action.payload
      }
    default:
      return state;
  }
}

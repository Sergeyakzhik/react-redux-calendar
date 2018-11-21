import { TOGGLE_EVENT_INFO_FIELD } from '../../constants/action-types.js';

const initialState = {
  isActive: false,
  target: ''
}

export function eventInfoFieldReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EVENT_INFO_FIELD:
      return {
        isActive: action.payload.isActive,
        target: action.payload.target
      }
    default:
      return state;
  }
}

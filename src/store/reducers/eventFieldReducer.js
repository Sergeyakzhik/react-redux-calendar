import { TOGGLE_EVENT_FIELD } from '../../constants/action-types.js'

const initialState = {
  isActive: false
}

export function eventFieldReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EVENT_FIELD:
      return { ...state, isActive: action.payload }
    default:
      return state;
  }
}

import { OPEN_SHOW_MORE_FIELD,

} from '../../constants/action-types.js';

const initialState = {
  isActive: false,
  events: []
}

export function showMoreFieldReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_SHOW_MORE_FIELD:
      return { ...state,
        isActive: action.payload.isOpened,
        events: action.payload.events
      }
    default:
      return state;
  }
}

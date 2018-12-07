import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  SET_INITIAL_DATE
} from '../../constants/action-types';

export const initialState = {
  isActive: false,
  event: {
    initialDate: ''
  }
}

export function eventFieldReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_EVENT_FIELD:
      return { ...state,
        isActive: action.payload,
      }
    case CLOSE_EVENT_FIELD:
      return { ...state,
        isActive: action.payload,
      }
    case SET_INITIAL_DATE: {
      return { ...state,
        event: {
          initialDate: action.payload
        }
      }
    }
    default:
      return state;
  }
}

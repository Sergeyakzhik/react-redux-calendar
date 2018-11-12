import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  CHANGE_START_DATE,
  CHANGE_END_DATE
} from '../../constants/action-types';

const initialState = {
  isActive: false,
  startDate: '',
  endDate: ''
}

export function eventFieldReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_EVENT_FIELD:
      return { ...state,
        isActive: action.payload.isActive,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate
      }
    case CLOSE_EVENT_FIELD:
      return { ...state,
        isActive: action.payload
      }
    case CHANGE_START_DATE:
      return { ...state,
        startDate: action.payload
      }
    case CHANGE_END_DATE:
      return { ...state,
        endDate: action.payload
      }
    default:
      return state;
  }
}

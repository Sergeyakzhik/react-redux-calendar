import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  ADD_EVENT,
  CHANGE_EVENT_NAME,
  CHANGE_EVENT_DESCRIPTION,
  CHANGE_EVENT_PLACE
} from '../../constants/action-types';
import moment from "moment";

let defaultDate = moment();

const initialState = {
  isActive: false,
  events: {},
  event: {
    name: '',
    place: '',
    startDate: defaultDate,
    endDate: defaultDate,
    description: ''
  }
}

export function eventFieldReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_EVENT_FIELD:
      return { ...state,
        isActive: action.payload.isActive,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        event: {
          ...state.event,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate
        }
      }
    case CLOSE_EVENT_FIELD:
      return { ...state,
        isActive: action.payload,
      }
    case CHANGE_START_DATE:
      return { ...state,
        event: {
          ...state.event,
          startDate: action.payload
        }
      }
    case CHANGE_END_DATE:
      return { ...state,
        event: {
          ...state.event,
          endDate: action.payload
        }
      }
    case ADD_EVENT:
      return { ...state,
        isActive: action.payload.isActive,
        events: {
          ...state.events,
          ['event_' + action.payload.event.name]: action.payload.event
        }
      }
    case CHANGE_EVENT_NAME:
      return { ...state,
        event: {
          ...state.event,
          name: action.payload
        }
      }
    case CHANGE_EVENT_DESCRIPTION:
      return { ...state,
        event: {
          ...state.event,
          description: action.payload
        }
      }
    case CHANGE_EVENT_PLACE:
      return { ...state,
        event: {
          ...state.event,
          place: action.payload
        }
      }
    default:
      return state;
  }
}

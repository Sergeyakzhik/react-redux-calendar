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

const initialState = {
  isActive: false,
  events: {},
  event: {
    name: '',
    place: '',
    startDate: '',
    endDate: '',
    description: '',
    length: 1
  }
}

export function eventFieldReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_EVENT_FIELD:
      return { ...state,
        isActive: action.payload,
        event: {
          ...state.event,
          startDate: moment(),
          endDate: moment()
        }
      }
    case CLOSE_EVENT_FIELD:
      return { ...state,
        isActive: action.payload,
      }
    case CHANGE_START_DATE: {
    const start = action.payload.startDate;
    const end = action.payload.endDate;
      return { ...state,
        event: {
          ...state.event,
          length: end.diff(start, 'days') + 2,
          startDate: start
        }
      }
    }
    case CHANGE_END_DATE: {
      const start = action.payload.startDate;
      const end = action.payload.endDate;
      return { ...state,
        event: {
          ...state.event,
          length: end.diff(start, 'days') + 2,
          endDate: end
        }
      }
    }
    case ADD_EVENT:
    const newEvent = action.payload.event;
      return { ...state,
        isActive: action.payload.isActive,
        events: {
          ...state.events,
          ['event_' +
            newEvent.name +
            newEvent.startDate.date() +
            newEvent.endDate.date()
          ]: action.payload.event
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

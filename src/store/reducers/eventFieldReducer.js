import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  ADD_EVENT,
  DELETE_EVENT,
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
    length: 1,
    timeDiff: 0
  }
}

let countMinutes = () => {
  let minutes = moment().minutes();

  return minutes <= 15 ? 15 : minutes <= 30 ? 30 : minutes <= 45 ? 45 : 0;
}

export function eventFieldReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_EVENT_FIELD:
      return { ...state,
        isActive: action.payload,
        event: {
          ...state.event,
          startDate: state.event.startDate || moment().minutes(countMinutes()),
          endDate: state.event.startDate || moment().minutes(countMinutes())
        }
      }
    case CLOSE_EVENT_FIELD:
      return { ...state,
        isActive: action.payload,
      }
    case CHANGE_START_DATE: {
      return { ...state,
        event: {
          ...state.event,
          startDate: action.payload
        }
      }
    }
    case CHANGE_END_DATE: {
      return { ...state,
        event: {
          ...state.event,
          endDate: action.payload
        }
      }
    }
    case ADD_EVENT:
      const newEvent = action.payload.event;
      const startDate = newEvent.startDate;
      const endDate = newEvent.endDate;
      const length = endDate.diff(moment(startDate).startOf('day'), 'days') + 1;
      const timeDiff = moment(endDate).diff(moment(startDate), 'minutes');

      newEvent.length = length;
      newEvent.timeDiff = timeDiff;

      return { ...state,
        isActive: action.payload.isActive,
        events: {
          ...state.events,
          [
            newEvent.name +
            newEvent.startDate.toString() +
            newEvent.endDate.toString()
          ]: newEvent
        },
        event: {
          ...state.event,
          name: '',
          place: '',
          description: '',
          length: 1,
          timeDiff: 0
        }
      }
    case DELETE_EVENT:
      delete state.events[action.payload]
      return { ...state
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

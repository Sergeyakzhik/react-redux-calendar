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

let countMinutes = () => {
  let now = moment();
  let minutes = now.minutes();

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

      newEvent.length = length;

      return { ...state,
        isActive: action.payload.isActive,
        events: {
          ...state.events,
          ['event_' +
            newEvent.name +
            newEvent.startDate.date() +
            newEvent.endDate.date()
          ]: newEvent
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

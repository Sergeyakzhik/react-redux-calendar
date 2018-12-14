import moment from 'moment';
import {
  TOGGLE_TIME_SEGMENT,
  CHANGE_PERIOD,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  SET_INITIAL_DATE,
  CLEAR_EVENT_DATA,
} from '../../constants/action-types';
import {
  MONTH,
} from '../../constants/constants';


export const initialState = {
  table: MONTH,
  period: moment(),
  events: {},
  isActive: false,
  initialDate: null,
  usage: '',
  event: null,
};

export function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TIME_SEGMENT:
      return {
        ...state,
        table: action.payload,
      };
    case CHANGE_PERIOD:
      return {
        ...state,
        period: action.payload,
      };
    case ADD_EVENT: {
      const newEvent = action.payload;
      const { startDate, endDate, name } = newEvent;

      const length = endDate.diff(moment(startDate).startOf('day'), 'days') + 1;
      const timeDiff = moment(endDate).diff(moment(startDate), 'minutes');
      const targetKey = newEvent.name + newEvent.startDate.toString() + newEvent.endDate.toString();

      newEvent.length = length;
      newEvent.timeDiff = timeDiff;
      newEvent.targetKey = targetKey;

      const eventKey = `${name}${startDate.toString()}${endDate.toString()}`;

      return {
        ...state,
        events: {
          ...state.events,
          [eventKey]: newEvent,
        },
      };
    }
    case DELETE_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload]: null,
        },
      };
    case UPDATE_EVENT: {
      const { events } = state;
      const { targetKey, newEvent } = action.payload;
      const { name, startDate, endDate } = newEvent;
      const newTargetKey = name + startDate.toString() + endDate.toString();

      if (targetKey !== newTargetKey) {
        Object.defineProperty(events, newTargetKey,
          Object.getOwnPropertyDescriptor(events, targetKey));
        delete events[targetKey];
      }

      const length = moment(newEvent.endDate).diff(moment(newEvent.startDate).startOf('day'), 'days') + 1;
      const timeDiff = moment(newEvent.endDate).diff(moment(newEvent.startDate), 'minutes');

      newEvent.length = length;
      newEvent.timeDiff = timeDiff;
      newEvent.targetKey = newTargetKey;

      events[newTargetKey] = Object.assign({}, newEvent);

      return {
        ...state,
        events: Object.assign({}, state.events),
      };
    }
    case OPEN_EVENT_FIELD:
      return {
        ...state,
        isActive: action.payload.isActive,
        usage: action.payload.usage,
        event: action.payload.event,
      };
    case CLOSE_EVENT_FIELD:
      return {
        ...state,
        isActive: action.payload,
        usage: '',
        event: null,
      };
    case SET_INITIAL_DATE: {
      return {
        ...state,
        initialDate: action.payload,
      };
    }
    case CLEAR_EVENT_DATA: {
      return {
        ...state,
        event: null,
      };
    }
    default:
      return state;
  }
}

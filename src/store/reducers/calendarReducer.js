import {
  TOGGLE_TIME_SEGMENT,
  CHANGE_PERIOD,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT
} from '../../constants/action-types.js';
import moment from "moment";

const initialState = {
  table: 'Month',
  period: moment(),
  events: {}
}

export function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TIME_SEGMENT:
      return { ...state,
        table: action.payload
      }
    case CHANGE_PERIOD:
      return { ...state,
        period: action.payload
      }
    case ADD_EVENT:
      const newEvent = action.payload;
      const startDate = newEvent.startDate;
      const endDate = newEvent.endDate;
      const length = endDate.diff(moment(startDate).startOf('day'), 'days') + 1;
      const timeDiff = moment(endDate).diff(moment(startDate), 'minutes');
      const targetKey = newEvent.name + newEvent.startDate.toString() + newEvent.endDate.toString();

      newEvent.length = length;
      newEvent.timeDiff = timeDiff;
      newEvent.targetKey = targetKey;

      return { ...state,
        events: {
          ...state.events,
          [
            newEvent.name +
            newEvent.startDate.toString() +
            newEvent.endDate.toString()
          ]: newEvent
        },
      }
    case DELETE_EVENT:
      delete state.events[action.payload];
      return { ...state,
        events: Object.assign({}, state.events)
      }
    case UPDATE_EVENT:
      const events = state.events;
      const oldTargetKey = action.payload.targetKey;
    //  let eventToUpdate = events[oldTargetKey];
      const updatedEvent = action.payload.newEvent;
      const newTargetKey = updatedEvent.name + updatedEvent.startDate.toString() + updatedEvent.endDate.toString();

      if (action.payload.targetKey !== newTargetKey) {
          Object.defineProperty(events, newTargetKey,
              Object.getOwnPropertyDescriptor(events, oldTargetKey));
          delete events[oldTargetKey];
      }

      updatedEvent.length = moment(updatedEvent.endDate).diff(moment(updatedEvent.startDate).startOf('day'), 'days') + 1;
      updatedEvent.timeDiff = moment(updatedEvent.endDate).diff(moment(updatedEvent.startDate), 'minutes');
      updatedEvent.targetKey = newTargetKey;

    //  eventToUpdate = Object.assign({}, newEvent);

      return { ...state,
        events: Object.assign({}, state.events)
      }
    default:
      return state;
  }
}

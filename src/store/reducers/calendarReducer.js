import { TOGGLE_TIME_SEGMENT, CHANGE_PERIOD } from '../../constants/action-types.js';
import moment from "moment";

const initialState = {
  table: 'Month',
  period: moment()
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
    default:
      return state;
  }
}

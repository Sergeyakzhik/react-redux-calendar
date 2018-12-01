import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  CHANGE_START_DATE,
  SET_INITIAL_DATE,
  CHANGE_EVENT_DESCRIPTION,
  CHANGE_EVENT_PLACE
} from '../../constants/action-types';
import moment from "moment";

const initialState = {
  isActive: false,
  event: {
    initialDate: ''
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

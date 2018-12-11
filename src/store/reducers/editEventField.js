import {
  OPEN_EVENT_FIELD,
  CLOSE_EVENT_FIELD,
  SET_INITIAL_DATE,
} from '../../constants/action-types';

export const initialState = {
  isActive: false,
  initialDate: '',
  usage: '',
  event: {},
};

export function eventFieldReducer(state = initialState, action) {
  switch (action.type) {
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
        event: {},
      };
    case SET_INITIAL_DATE: {
      return {
        ...state,
        initialDate: action.payload,
      };
    }
    default:
      return state;
  }
}

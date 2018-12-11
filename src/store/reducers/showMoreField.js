import { TOGGLE_SHOW_MORE_FIELD } from '../../constants/action-types';

const initialState = {
  isActive: false,
  events: [],
};

export function showMoreFieldReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SHOW_MORE_FIELD:
      return {
        ...state,
        isActive: action.payload.isActive,
        events: action.payload.events,
      };
    default:
      return state;
  }
}

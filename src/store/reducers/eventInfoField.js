import {
  TOGGLE_EVENT_INFO_FIELD,
  CHANGE_POSITION,
} from '../../constants/action-types';

export const initialState = {
  curTarget: '',
  posX: null,
  posY: null,
};

export function eventInfoFieldReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EVENT_INFO_FIELD:
      return {
        ...state,
        curTarget: action.payload,
      };
    case CHANGE_POSITION:
      return {
        ...state,
        posX: action.payload.posX,
        posY: action.payload.posY,
      };
    default:
      return state;
  }
}

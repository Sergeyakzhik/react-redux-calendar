import {
  TOGGLE_EVENT_INFO_FIELD,
  CHANGE_POSITION
} from '../../constants/action-types.js';

const initialState = {
  curTarget: '',
  posX: '',
  posY: ''
}

export function eventInfoFieldReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EVENT_INFO_FIELD:
      return { ...state,
        curTarget: action.payload
      }
    case CHANGE_POSITION:
      return { ...state,
        posX: action.payload.posX,
        posY: action.payload.posY
      }
    default:
      return state;
  }
}

import { CHANGE_STYLE } from '../../constants/action-types';

const initialState = {
  style: 'style1'
}

export function styleReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STYLE:
      return {
        style: action.payload
      }
    default:
      return state;
  }
}

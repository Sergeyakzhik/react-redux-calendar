import * as types from '../../constants/action-types'

const initialState = {
  segment: 'month'
}

const timeSegmentReducer = function(state = initialState, action) {
  switch (action.type) {
    case NEXT_TIME_SEGMENT:
      return Object.assign({}, state, {
        segment: action.segment
      });
    case PREV_TIME_SEGMENT:
      return {...state, period: action.payload};
  }
  return state;
}

export default timeSegmentReducer;

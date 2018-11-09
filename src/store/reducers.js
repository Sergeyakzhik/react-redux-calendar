import { combineReducers } from 'redux';

import timeSegmentReducer from './reducers/timeSegmentReducer';

let reducers = combineReducers({
  timeSegmentState: timeSegmentReducer
});

export default reducers;

import { combineReducers } from 'redux';
import { calendarReducer } from './calendarReducer';
import { eventFieldReducer } from './eventFieldReducer';
import { showMoreFieldReducer } from './showMoreFieldReducer';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  eventField: eventFieldReducer,
  showMoreField: showMoreFieldReducer
});

import { combineReducers } from 'redux';
import { calendarReducer } from './calendarReducer';
import { eventFieldReducer } from './eventFieldReducer';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  eventField: eventFieldReducer
});

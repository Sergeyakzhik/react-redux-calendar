import { combineReducers } from 'redux';
import { calendarReducer } from './calendarReducer';
import { eventFieldReducer } from './eventFieldReducer';
import { showMoreFieldReducer } from './showMoreFieldReducer';
import { eventInfoFieldReducer } from './eventInfoFieldReducer';
import { eventTransformerReducer } from './eventTransformerReducer';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  eventField: eventFieldReducer,
  showMoreField: showMoreFieldReducer,
  eventInfoField: eventInfoFieldReducer,
  eventTransformer: eventTransformerReducer
});

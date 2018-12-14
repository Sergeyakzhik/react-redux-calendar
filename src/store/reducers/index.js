import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { calendarReducer } from './calendar';
import { showMoreFieldReducer } from './showMoreField';
import { eventInfoFieldReducer } from './eventInfoField';
import { eventTransformerReducer } from './eventTransformer';

export const rootReducer = combineReducers({
  form: formReducer,
  calendar: calendarReducer,
  showMoreField: showMoreFieldReducer,
  eventInfoField: eventInfoFieldReducer,
  eventTransformer: eventTransformerReducer,
});

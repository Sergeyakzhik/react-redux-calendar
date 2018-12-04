import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { calendarReducer } from './calendarReducer';
import { eventFieldReducer } from './eventFieldReducer';
import { showMoreFieldReducer } from './showMoreFieldReducer';
import { eventInfoFieldReducer } from './eventInfoFieldReducer';
import { eventTransformerReducer } from './eventTransformerReducer';
import { styleReducer } from './styleReducer';


export const rootReducer = combineReducers({
  form: formReducer,
  calendar: calendarReducer,
  eventField: eventFieldReducer,
  showMoreField: showMoreFieldReducer,
  eventInfoField: eventInfoFieldReducer,
  eventTransformer: eventTransformerReducer,
  style: styleReducer
});

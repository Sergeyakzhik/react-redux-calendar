import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { calendarReducer } from './calendar';
import { eventFieldReducer } from './eventField';
import { showMoreFieldReducer } from './showMoreField';
import { eventInfoFieldReducer } from './eventInfoField';
import { eventTransformerReducer } from './eventTransformer';
import { styleReducer } from './style';

export const rootReducer = combineReducers({
  form: formReducer,
  calendar: calendarReducer,
  eventField: eventFieldReducer,
  showMoreField: showMoreFieldReducer,
  eventInfoField: eventInfoFieldReducer,
  eventTransformer: eventTransformerReducer,
  style: styleReducer
});

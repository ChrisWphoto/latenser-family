import { combineReducers } from 'redux';
import CalendarReducer from './calendar_reducer.js';

const rootReducer = combineReducers({
  calendar: CalendarReducer
});

export default rootReducer;

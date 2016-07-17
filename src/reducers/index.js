import { combineReducers } from 'redux';
import CalendarReducer from './calendar_reducer';
import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
  calendar: CalendarReducer,
  auth: AuthReducer

});

export default rootReducer;

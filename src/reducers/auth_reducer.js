import * as C from '../constants'

const INIT_STATE = {
		currently: C.ANONYMOUS,
		username: null,
		uid: null
	};

export default function(currentstate = INIT_STATE, action){
	switch(action.type){
		case C.ATTEMPTING_LOGIN:
			return {
				currently: C.AWAITING_AUTH_RESPONSE,
				username: "guest",
				uid: null
			};
		case C.LOGOUT:
			return {
				currently: C.ANONYMOUS,
				username: "guest",
				uid: null
			};
		case C.LOGIN_USER:
			let obj = {
				currently: C.LOGGED_IN,
				username: action.username,
				uid: action.uid
			};
			return obj;
		default: return currentstate;
	}
};
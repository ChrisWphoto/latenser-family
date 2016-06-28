import * as actions from '../actions/index';

const INIT_STATE = { 
  events:[],
  datesClicked: [],
  addStayOpen: false,
  openAlert: false

};

export default function(state = INIT_STATE, action){
  
  switch (action.type) {

    case actions.ADD_STAY_TO_CAL:
      var x = {
        ...state,
        events: [...state.events, action.payload]
      };
      // console.log('add stay state',x); 
      return x;

    case actions.TOGGLE_ADD_STAY:
      let xx = {
        ...state, 
        datesClicked: action.payload, 
        addStayOpen: !state.addStayOpen 
      };
      console.log(xx);
      return xx;

      case actions.TOGGLE_ALERT:
        return {
          ...state,
          openAlert: !state.openAlert
        }

  }
  return state;
  
}
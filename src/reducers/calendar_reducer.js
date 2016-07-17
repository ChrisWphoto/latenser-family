import * as actions from '../actions/index';

const INIT_STATE = { 
  events:[],
  datesClicked: [],
  addStayOpen: false,
  openAlert: false,
  currentEvent: {},
  openEvtDetail: false

};

export default function(state = INIT_STATE, action){
  let newState;
  switch (action.type) {

    case actions.ADD_STAY_TO_CAL:
      return  {
        ...state,
        events: [...state.events, action.payload]
      };

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

      case actions.TOGGLE_EVT_DETAIL:
        return {
          ...state,
          currentEvent: action.payload || {},
          openEvtDetail: !state.openEvtDetail
        }
      
      case actions.DELETE_EVT:
        
        newState = { ...state };
        newState.events = newState.events.filter( (evt) => {
            return action.payload.id !== evt.id
        });
        return newState;
         

  }
  return state;
  
}
export const ADD_STAY_TO_CAL =    'ADD_STAY_TO_CAL';
export const TOGGLE_ADD_STAY =    'TOGGLE_ADD_STAY';
export const TOGGLE_ALERT =       'TOGGLE_ALERT';
export const TOGGLE_EVT_DETAIL =  'TOGGLE_EVT_DETAIL'; 
export const DELETE_EVT =         'DELTE_EVT';


/**
 * @param stayInfo is an object containing 2 dates and # of guests 
 */
export function addStay(stayInfo) {
  return {
    type: ADD_STAY_TO_CAL,
    payload: stayInfo
  }
}

export function toggleAddStay(dates) {
  return {
    type: TOGGLE_ADD_STAY,
    payload: dates
  }
}

export function toggleAlert() {
  return {
    type: TOGGLE_ALERT,
    payload: null
  }
}

export function deleteEvt(evt) {
  return {
    type: DELETE_EVT,
    payload: evt
  }
}

export function toggleEvtDetail(evt) {
  return {
    type: TOGGLE_EVT_DETAIL,
    payload: evt
  }
}
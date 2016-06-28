export const ADD_STAY_TO_CAL = 'ADD_STAY_TO_CAL';
export const TOGGLE_ADD_STAY = 'TOGGLE_ADD_STAY';
export const TOGGLE_ALERT = 'TOGGLE_ALERT';

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
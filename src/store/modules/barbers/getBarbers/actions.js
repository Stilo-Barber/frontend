export function getBarbersInRequest(token) {
  return {
    type: '@getBarbers/GETBARBERS_IN_REQUEST',
    payload: { token },
  };
}

export function getBarbersInSuccess(token, barbers) {
  return {
    type: '@getBarbers/BARBERS_IN_SUCCESS',
    payload: { token, barbers },
  };
}

export function getBarbersFailure() {
  return {
    type: '@getBarbers/BARBERS_FAILURE',
  };
}

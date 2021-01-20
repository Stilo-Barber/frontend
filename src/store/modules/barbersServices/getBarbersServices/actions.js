export function getBarbersServicesInRequest(token, barberId) {
  return {
    type: '@getBarbersServices/GETBARBERS_SERVICES_IN_REQUEST',
    payload: { token, barberId },
  };
}

export function getBarbersServicesInSuccess(token, barbersServices) {
  return {
    type: '@getBarbersServices/BARBERS_SERVICES_IN_SUCCESS',
    payload: { token, barbersServices },
  };
}

export function getBarbersServicesFailure() {
  return {
    type: '@getBarbersServices/BARBERS_SERVICES_FAILURE',
  };
}

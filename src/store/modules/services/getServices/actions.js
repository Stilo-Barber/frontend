export function getServicesInRequest(token) {
  return {
    type: '@getServices/GETSERVICES_IN_REQUEST',
    payload: { token },
  };
}

export function getServicesInSuccess(token, services) {
  return {
    type: '@getServices/SERVICES_IN_SUCCESS',
    payload: { token, services },
  };
}

export function getServicesFailure() {
  return {
    type: '@getServices/SERVICES_FAILURE',
  };
}

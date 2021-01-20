export function getAppointmentsInRequest(token, barberId) {
  return {
    type: '@getAppointments/GETAPPOINTMENTS_IN_REQUEST',
    payload: { token, barberId },
  };
}

export function getAppointmentsInSuccess(token, appointments) {
  return {
    type: '@getAppointments/APPOINTMENTS_IN_SUCCESS',
    payload: { token, appointments },
  };
}

export function getAppointmentsFailure() {
  return {
    type: '@getAppointments/APPOINTMENTS_FAILURE',
  };
}

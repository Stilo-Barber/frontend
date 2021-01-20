import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

export default function getAppointments(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case '@getAppointments/GETAPPOINTMENTS_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@getAppointments/APPOINTMENTS_IN_SUCCESS': {
        draft.loading = false;
        draft.data = payload.appointments.appointments;
        draft.error = false;
        break;
      }

      case '@getAppointments/APPOINTMENTS_FAILURE': {
        draft.loading = false;
        draft.error = true;
        break;
      }
      default:
    }
  });
}

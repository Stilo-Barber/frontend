import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

export default function getBarbersServices(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case '@getBarbersServices/GETBARBERS_SERVICES_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@getBarbersServices/BARBERS_SERVICES_IN_SUCCESS': {
        draft.loading = false;
        draft.data = payload.barbersServices.barbersServices;
        draft.error = false;
        break;
      }

      case '@getBarbersServices/BARBERS_SERVICES_FAILURE': {
        draft.loading = false;
        draft.error = true;
        break;
      }
      default:
    }
  });
}

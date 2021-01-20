import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

export default function getServices(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case '@getServices/GETSERVICES_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@getServices/SERVICES_IN_SUCCESS': {
        draft.loading = false;
        draft.data = payload.services.services;
        draft.error = false;
        break;
      }

      case '@getServices/SERVICES_FAILURE': {
        draft.loading = false;
        draft.error = true;
        break;
      }
      default:
    }
  });
}

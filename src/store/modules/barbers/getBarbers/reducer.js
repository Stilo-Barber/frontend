import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

export default function getBarbers(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case '@getBarbers/GETBARBERS_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@getBarbers/BARBERS_IN_SUCCESS': {
        draft.loading = false;
        draft.data = payload.barbers.barbers;
        draft.error = false;
        break;
      }

      case '@getBarbers/BARBERS_FAILURE': {
        draft.loading = false;
        draft.error = true;
        break;
      }
      default:
    }
  });
}

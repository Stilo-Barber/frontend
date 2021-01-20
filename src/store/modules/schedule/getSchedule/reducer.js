import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

export default function getSchedule(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case '@getSchedule/GETSCHEDULE_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@getSchedule/SCHEDULE_IN_SUCCESS': {
        draft.loading = false;
        draft.data = payload.schedule.schedule;
        draft.error = false;
        break;
      }

      case '@getSchedule/SCHEDULE_FAILURE': {
        draft.loading = false;
        draft.error = true;
        break;
      }
      default:
    }
  });
}

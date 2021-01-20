export function getScheduleInRequest(token, barberId) {
  return {
    type: '@getSchedule/GETSCHEDULE_IN_REQUEST',
    payload: { token, barberId },
  };
}

export function getScheduleInSuccess(token, schedule) {
  return {
    type: '@getSchedule/SCHEDULE_IN_SUCCESS',
    payload: { token, schedule },
  };
}

export function getScheduleFailure() {
  return {
    type: '@getSchedule/SCHEDULE_FAILURE',
  };
}

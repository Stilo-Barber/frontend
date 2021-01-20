import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '../../../../services/api';

import { getScheduleInSuccess, getScheduleFailure } from './actions';

function* getSchedule({ payload }) {
  const { token, barberId } = payload;

  try {
    const response = yield call(api.get, `/schedule/all/${barberId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response)


    const schedule = {
      schedule: response.data,
    };

    console.log("teste", schedule)

    yield put(getScheduleInSuccess(response.data.token, schedule));
  } catch (error) {
    yield put(getScheduleFailure());
  }
}

export default all([
  takeLatest('@getSchedule/GETSCHEDULE_IN_REQUEST', getSchedule),
]);

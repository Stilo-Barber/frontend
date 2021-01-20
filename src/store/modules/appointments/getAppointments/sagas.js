import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '../../../../services/api';

import { getAppointmentsInSuccess, getAppointmentsFailure } from './actions';

function* getAppointments({ payload }) {
  const { token, barberId } = payload;

  try {
    const response = yield call(api.get, `/appointments/all/${barberId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const appointments = {
      appointments: response.data,
    };

    yield put(getAppointmentsInSuccess(response.data.token, appointments));
  } catch (error) {
    yield put(getAppointmentsFailure());
  }
}

export default all([
  takeLatest('@getAppointments/GETAPPOINTMENTS_IN_REQUEST', getAppointments),
]);

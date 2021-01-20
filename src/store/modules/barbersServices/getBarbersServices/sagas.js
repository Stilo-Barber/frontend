import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '../../../../services/api';

import { getBarbersServicesInSuccess, getBarbersServicesFailure } from './actions';

function* getBarbersServices({ payload }) {
  const { token, barberId } = payload;

  try {
    const response = yield call(api.get, `/barbers/services/all/${barberId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const barbersServices = {
      barbersServices: response.data,
    };

    yield put(getBarbersServicesInSuccess(response.data.token, barbersServices));
  } catch (error) {
    yield put(getBarbersServicesFailure());
  }
}

export default all([
  takeLatest('@getBarbersServices/GETBARBERS_SERVICES_IN_REQUEST', getBarbersServices),
]);

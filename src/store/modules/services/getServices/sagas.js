import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '../../../../services/api';

import { getServicesInSuccess, getServicesFailure } from './actions';

function* getServices({ payload }) {
  const { token } = payload;

  try {
    const response = yield call(api.get, `/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    const services = {
      services: response.data,
    };

    yield put(getServicesInSuccess(response.data.token, services));
  } catch (error) {
    yield put(getServicesFailure());
  }
}

export default all([
  takeLatest('@getServices/GETSERVICES_IN_REQUEST', getServices),
]);

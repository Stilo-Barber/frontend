import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '../../../../services/api';

import { getBarbersInSuccess, getBarbersFailure } from './actions';

function* getBarbers({ payload }) {
  const { token } = payload;

  try {
    const response = yield call(api.get, `/barbers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    const barbers = {
      barbers: response.data,
    };

    yield put(getBarbersInSuccess(response.data.token, barbers));
  } catch (error) {
    yield put(getBarbersFailure());
  }
}

export default all([
  takeLatest('@getBarbers/GETBARBERS_IN_REQUEST', getBarbers),
]);

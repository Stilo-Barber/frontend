import { all } from "redux-saga/effects";

import auth from "./auth/sagas";
import user from "./user/sagas";
import schedule from "./schedule/getSchedule/sagas";
import appointments from "./appointments/getAppointments/sagas";
import barbers from "./barbers/getBarbers/sagas";
import services from "./services/getServices/sagas";
import barbersServices from "./barbersServices/getBarbersServices/sagas";

export default function* rootSaga() {
  return yield all([auth, user, schedule, appointments, barbers, services, barbersServices]);
}

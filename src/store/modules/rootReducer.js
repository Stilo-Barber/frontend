import { combineReducers } from "redux";

import auth from "./auth/reducer";
import user from "./user/reducer";
import schedule from "./schedule/getSchedule/reducer";
import appointments from "./appointments/getAppointments/reducer";
import barbers from "./barbers/getBarbers/reducer";
import services from "./services/getServices/reducer";
import barbersServices from "./barbersServices/getBarbersServices/reducer";

export default combineReducers({ auth, user, schedule, appointments, barbers , services, barbersServices});

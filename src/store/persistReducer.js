import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  return persistReducer(
    {
      key: "barber-stilo",
      storage,
      whitelist: ["auth", "user"],
    },
    reducers
  );
};

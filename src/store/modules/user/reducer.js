import produce from "immer";

const INITIAL_STATE = {
  id: "",
  name: "",
  email: "",
};

export default function user(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case "@auth/SIGN_IN_SUCCESS": {
        draft.id = payload.user.id;
        draft.name = payload.user.name;
        draft.email = payload.user.email;
        break;
      }

      case "@auth/SIGN_OUT": {
        draft.id = null;
        draft.name = null;
        draft.email = null;
        break;
      }

      default:
    }
  });
}

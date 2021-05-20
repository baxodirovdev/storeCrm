import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../CONSTANTS";

const initialState: { user: any | object } = {
  user: false,
};

interface Action {
  type: string;
  payload: { uid: string };
}

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
      };

    case SIGN_UP:
      return {
        ...state,
        user: action.payload,
      };

    case SIGN_OUT:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

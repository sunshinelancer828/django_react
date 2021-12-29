import { LOGIN_SUCESS } from "../actions/type";

const initialState = {
  isAuthenticated: false,
  token: ""
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

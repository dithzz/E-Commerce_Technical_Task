import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return { ...state, user: { ...payload } };
    case ActionTypes.ADD_USER:
      return { ...state, user: { ...payload } };
    case ActionTypes.LOGOUT_USER:
      return { ...state, user: { ...payload } };
    case ActionTypes.FORGOT_PASSWORD:
      return { ...state, user: { ...payload } };
    default:
      return state;
  }
};

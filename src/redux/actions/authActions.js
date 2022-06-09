import { ActionTypes } from "../constants/action-types";

export const setUser = (user) => {
  return {
    type: ActionTypes.SET_USER,
    payload: user,
  };
};

export const addUser = (user) => {
  return {
    type: ActionTypes.ADD_USER,
    payload: user,
  };
};

export const logoutUser = (user) => {
  return {
    type: ActionTypes.LOGOUT_USER,
    payload: user,
  };
};

export const forgotPassword = (user) => {
  return {
    type: ActionTypes.FORGOT_PASSWORD,
    payload: user,
  };
};

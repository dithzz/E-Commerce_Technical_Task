import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const authorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_AUTHOR:
      return { ...state, author: { ...payload } };
    case ActionTypes.GET_AUTHORS:
      return { ...state, authors: { ...payload } };
    case ActionTypes.GET_SINGLE_AUTHOR:
      return { ...state, author: { ...payload } };
    default:
      return state;
  }
};

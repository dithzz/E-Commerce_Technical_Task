import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_CATEGORIES:
      return { ...state, categories: { ...payload } };
    case ActionTypes.GET_CATEGORY:
      return { ...state, category: { ...payload } };
    default:
      return state;
  }
};

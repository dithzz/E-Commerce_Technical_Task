import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TO_CART:
      return { ...state, cart: { ...payload } };
    case ActionTypes.GET_CART:
      return { ...state, cart: { ...payload } };
    default:
      return state;
  }
};

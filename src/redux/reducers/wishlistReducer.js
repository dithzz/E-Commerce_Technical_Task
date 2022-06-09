import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const wishlistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TO_WISHLIST:
      return { ...state, wishlist: { ...payload } };
    case ActionTypes.GET_WISHLIST:
      return { ...state, wishlistItems: { ...payload } };
    default:
      return state;
  }
};

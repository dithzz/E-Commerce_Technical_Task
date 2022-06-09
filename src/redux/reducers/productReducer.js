import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_NEW_ARRIVALS:
      return { ...state, newArrivals: { ...payload } };
    case ActionTypes.SET_TRENDING_NOW:
      return { ...state, trendingNow: { ...payload } };
    case ActionTypes.SET_BEST_SELLERS:
      return { ...state, bestSellers: { ...payload } };
    case ActionTypes.GET_PRODUCTS:
      return { ...state, products: { ...payload } };
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, product: { ...payload } };
    // case ActionTypes.GET_CATEGORIES:
    //   return { ...state, categories: { ...payload } };

    default:
      return state;
  }
};

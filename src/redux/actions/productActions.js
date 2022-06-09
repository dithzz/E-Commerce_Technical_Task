import { ActionTypes } from "../constants/action-types";

export const setNewArrivals = (products) => {
  return {
    type: ActionTypes.SET_NEW_ARRIVALS,
    payload: products,
  };
};

export const setTrendingNow = (products) => {
  return {
    type: ActionTypes.SET_TRENDING_NOW,
    payload: products,
  };
};

export const setBestSellers = (products) => {
  return {
    type: ActionTypes.SET_BEST_SELLERS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const getProducts = (products) => {
  return {
    type: ActionTypes.GET_PRODUCTS,
    payload: products,
  };
};

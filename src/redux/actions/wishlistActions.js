import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { SERVER_BASE_URL } from "../../config/config";

export const addToWishList = (products) => {
  return {
    type: ActionTypes.ADD_TO_WISHLIST,
    payload: products,
  };
};

export const getWishList = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/v1/app/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: ActionTypes.GET_WISHLIST,
      payload: response.data,
    });
  } catch (e) {
    toast.error(e);
  }
};

import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { SERVER_BASE_URL } from "../../config/config";

// export const addToCart = (products) => {
//   return {
//     type: ActionTypes.ADD_TO_CART,
//     payload: products,
//   };
// };

export const addToCart = (productId, token) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/v1/app/add-to-cart`,
      { item: productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: response.data.payload,
    });
  } catch (e) {
    toast.error(e);
  }
};

export const getCart = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/v1/app/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: ActionTypes.GET_CART,
      payload: response.data.payload,
    });
  } catch (e) {
    toast.error(e);
  }
};

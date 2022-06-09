import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { SERVER_BASE_URL } from "../../config/config";

// export const getCategories = (categories) => {
//   return {
//     type: ActionTypes.GET_CATEGORIES,
//     payload: categories,
//   };
// };

export const getCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/v1/app/categories`);
    dispatch({
      type: ActionTypes.GET_CATEGORIES,
      payload: response.data,
    });
  } catch (e) {
    toast.error(e);
  }
};

export const getCategory = (id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await axios.get(
      `${SERVER_BASE_URL}/v1/app/category/${id}`
    );
    dispatch({
      type: ActionTypes.GET_CATEGORY,
      payload: response.data,
    });
  } catch (e) {
    toast.error(e);
  }
};

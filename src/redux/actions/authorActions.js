import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { SERVER_BASE_URL } from "../../config/config";

export const setAuthor = (author) => {
  return {
    type: ActionTypes.SET_AUTHOR,
    payload: author,
  };
};

export const getAuthors = (authors) => async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/v1/app/authors`, {});
    dispatch({
      type: ActionTypes.GET_AUTHORS,
      payload: response.data,
    });
  } catch (e) {
    toast.error(e);
  }
};

export const getSingleAuthor = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/v1/app/author/${id}`);
    dispatch({
      type: ActionTypes.GET_SINGLE_AUTHOR,
      payload: response.data,
    });
  } catch (e) {
    toast.error(e);
  }
};

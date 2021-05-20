import { Dispatch } from "redux";
import { ADD_CART, CLEAR_CART, REMOVE_CART } from "../CONSTANTS";

export const addToCart = (product:{}) => async (dispatch: Dispatch) => {
  dispatch({
    type: ADD_CART,
    payload: product,
  });
};


export const removeFromCart = (product:{}) => async (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_CART,
    payload: product,
  });
};


export const clearCart = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_CART,
    payload: [],
  });
};

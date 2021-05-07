import { ADD_CART, CLEAR_CART, REMOVE_CART } from "../CONSTANTS";

export const addToCart = ( product) => async (dispatch) => {
  dispatch({
    type: ADD_CART,
    payload: product,
  });
};


export const removeFromCart = (product) => async (dispatch) => {
  dispatch({
    type: REMOVE_CART,
    payload: product,
  });
};


export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
    payload: [],
  });
};

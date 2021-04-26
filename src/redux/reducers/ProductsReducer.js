import { ADD_PRODUCT, EDIT_PRODUCT, GET_PRODUCT, REMOVE_PRODUCT } from "../CONSTANTS";

const initialState = {
  products: [],
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case REMOVE_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

    case EDIT_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default ProductsReducer;

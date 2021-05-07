import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
} from "../CONSTANTS";

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
      const newProducts = state.products.filter(
        (item) => item.key !== action.payload
      );

      return {
        ...state,
        products: newProducts,
      };

    case EDIT_PRODUCT:
      const newData = [...state.products];
      const index = newData.findIndex(
        (item) => action.payload.key === item.key
      );
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...action.payload.newData });

      return {
        ...state,
        products: newData,
      };

    case UPDATE_PRODUCT:
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

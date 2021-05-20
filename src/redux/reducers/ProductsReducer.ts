import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCT,
  REMOVE_PRODUCT,
  // UPDATE_PRODUCT,
} from "../CONSTANTS";

const initialState: {products: [] | payloadType[] } = {
  products: [],
};


type payloadType = {
  key: string;
  number: number,
  newData: {};
  products: []
};

interface Action {
  type: string;
  payload: payloadType;
}



const ProductsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case REMOVE_PRODUCT:
      const newProducts = state.products.filter(
        (item: {key: string}) => item.key !== action.payload.key
      );

      return {
        ...state,
        products: [...newProducts],
      };

    case EDIT_PRODUCT:
      const newData: payloadType[] = [...state.products];
      const index = newData.findIndex(
        (item: {key: string}) => action.payload.key === item.key
      );
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...action.payload.newData });

      return {
        ...state,
        products: [...newData],
      };

    // case UPDATE_PRODUCT:
    //   return {
    //     ...state,
    //     products: [...action.payload],
    //   };

    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload.products,
      };

    default:
      return state;
  }
};

export default ProductsReducer;

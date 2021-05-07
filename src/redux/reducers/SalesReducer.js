import { ADD_SALES, EDIT_SALES, GET_SALES, REMOVE_SALES } from "../CONSTANTS";

const initialState = {
  sales: [],
};

const SalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SALES:
      return {
        ...state,
        sales: [...state.sales, action.payload],
      };

    case REMOVE_SALES:
      const newSales = state.sales.filter(
        (item) => item.key !== action.payload
      );

      return {
        ...state,
        sales: newSales,
      };

    case EDIT_SALES:
      const newData = [...state.sales];
      const index = newData.findIndex(
        (item) => action.payload.key === item.key
      );
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...action.payload.newData });

      return {
        ...state,
        sales: newData,
      };

    case GET_SALES:
      return {
        ...state,
        sales: action.payload,
      };

    default:
      return state;
  }
};

export default SalesReducer;

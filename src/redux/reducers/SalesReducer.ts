import { ADD_SALES, EDIT_SALES, GET_SALES, REMOVE_SALES } from "../CONSTANTS";

const initialState: { sales: [] | payloadType[] } = {
  sales: [],
};

type payloadType = {
  key: string;
  newData: {};
  sales: [];
};

interface Action {
  type: string;
  payload: payloadType;
}

const SalesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_SALES:
      return {
        ...state,
        sales: [...state.sales, action.payload],
      };

    case REMOVE_SALES:
      const newSales = state.sales.filter(
        (item: { key: string }) => item.key !== action.payload.key
      );

      return {
        ...state,
        sales: newSales,
      };

    case EDIT_SALES:
      const newData: any[] = [...state.sales];
      const index = newData.findIndex(
        (item: { key: string }) => action.payload.key === item.key
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
        sales: action.payload.sales,
      };

    default:
      return state;
  }
};

export default SalesReducer;

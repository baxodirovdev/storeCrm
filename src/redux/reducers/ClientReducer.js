import {
    ADD_CLIENT,
    EDIT_CLIENT,
    GET_CLIENT,
    REMOVE_CLIENT,
  } from "../CONSTANTS";
  
  const initialState = {
    clients: [],
  };
  
  const ClientReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_CLIENT:
        return {
          ...state,
          clients: [...state.clients, action.payload],
        };
  
      case REMOVE_CLIENT:
        const newProducts = state.clients.filter(
          (item) => item.key !== action.payload
        );
  
        return {
          ...state,
          clients: newProducts,
        };
  
      case EDIT_CLIENT:
        const newData = [...state.clients];
        const index = newData.findIndex(
          (item) => action.payload.key === item.key
        );
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...action.payload.newData });
  
        return {
          ...state,
          clients: newData,
        };
  
      case GET_CLIENT:
        return {
          ...state,
          clients: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default ClientReducer;
  
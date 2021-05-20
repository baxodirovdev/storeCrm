import {
  ADD_CLIENT,
  EDIT_CLIENT,
  GET_CLIENT,
  REMOVE_CLIENT,
} from "../CONSTANTS";

const initialState: { clients: [] | payloadType[] } = {
  clients: [],
};

type payloadType = {
  key: string;
  clientName: string;
  newData: {};
  clients: [];
};

interface Action {
  type: string;
  payload: payloadType;
}

const ClientReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };

    case REMOVE_CLIENT:
      const newProducts: payloadType[] = state.clients.filter(
        (item: { key: string }) => item.key !== action.payload.key
      );

      return {
        ...state,
        clients: [...newProducts],
      };

    case EDIT_CLIENT:
      const newData: payloadType[] = [...state.clients];
      const index = newData.findIndex(
        (item: { key: string }) => action.payload.key === item.key
      );
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...action.payload.newData });

      return {
        ...state,
        clients: [...newData],
      };

    case GET_CLIENT:
      const getClients: payloadType[] = [...action.payload.clients];

      return {
        ...state,
        clients: getClients,
      };

    default:
      return state;
  }
};

export default ClientReducer;

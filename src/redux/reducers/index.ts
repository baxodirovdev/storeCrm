import { combineReducers } from "redux";
import CartReducer from "./CartReducer";
import ClientReducer from "./ClientReducer";
import ProductsReducer from "./ProductsReducer";
import SalesReducer from "./SalesReducer";
import UserReducer from "./UserReducer";

export const rootReducer = combineReducers({
  user: UserReducer,
  products: ProductsReducer,
  clients: ClientReducer,
  cart: CartReducer,
  sales: SalesReducer,
});

export type RootState = ReturnType<typeof rootReducer>

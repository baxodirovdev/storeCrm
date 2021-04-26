import { combineReducers } from "redux";
import ProductsReducer from "./ProductsReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  user: UserReducer,
  products: ProductsReducer
});

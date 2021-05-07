import { ADD_CART, CLEAR_CART, REMOVE_CART } from "../CONSTANTS";

const initialState = {
  cart: [],
};

const CartReducer = (state = initialState, action) => {
  let newCart = [...state.cart];
  const index = state.cart.findIndex(
    (cartItem) => cartItem.key === action.payload.key
  );

  switch (action.type) {
    case ADD_CART:
      if (index >= 0) {
        let item = newCart[index];
        newCart.splice(index, 1, { ...item, cart: item.cart + 1 });
      } else {
        newCart = [
          ...newCart,
          {
            category: action.payload.category,
            cost: action.payload.cost,
            key: action.payload.key,
            number: action.payload.number,
            productName: action.payload.productName,
            cart: 1,
          },
        ];
      }

      return {
        ...state,
        cart: newCart,
      };

    case REMOVE_CART:
      if (index >= 0) {
        let item = newCart[index];
        newCart.splice(index, 1, { ...item, cart: item.cart - 1 });
      } else {
        console.warn("cant remove Item");
      }
      newCart = newCart.filter((item) => item.cart !== 0);

      return {
        ...state,
        cart: newCart,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

export default CartReducer;

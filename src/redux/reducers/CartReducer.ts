import { ADD_CART, CLEAR_CART, REMOVE_CART } from "../CONSTANTS";



type payloadType = {
  cart: number;
  category: string;
  cost: number;
  key: string;
  number: number;
  productName: string;
};

interface Cart{
  cart: payloadType[],
}

interface Action {
  type: string;
  payload: payloadType;
}

const initialState: Cart = {
  cart: [],
};

const CartReducer = (state: Cart = initialState, action: Action) => {
  let newCart: payloadType[] = [...state.cart];
  const index = state.cart.findIndex(
    (cartItem: { key: string }) => cartItem.key === action.payload.key
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
        cart: [...newCart],
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
        cart: [...newCart],
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default CartReducer;

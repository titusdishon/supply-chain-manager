import { OrdersAction, CartActionTypes } from "../actions/cart-actions";
import { CartState, Product } from "../types";

const initialState: CartState = {
  cart: [],
  error: null,
};

export const cartReducer = (
  state = initialState,
  action: OrdersAction
): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      const productToAdd: Product = action.payload;
      const isProductAlreadyAdded = state.cart.some(
        (item) => item.id === productToAdd.id
      );

      if (isProductAlreadyAdded) {
        return {
          ...state,
          error: "Product already added to the cart",
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, productToAdd],
          error: null,
        };
      }

    case CartActionTypes.RESET_CART:
      return {
        ...state,
        cart: [],
        error: null,
      };
    case CartActionTypes.RESET_CART_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

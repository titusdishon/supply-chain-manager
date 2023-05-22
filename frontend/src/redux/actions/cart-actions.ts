import { Product } from "../types";

export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  RESET_CART = "RESET_CART",
  RESET_CART_ERROR = "RESET_CART_ERROR",
}

export interface AddToCartRequestAction {
  type: CartActionTypes.ADD_TO_CART;
  payload: Product;
}
export interface ResetCartRequestAction {
  type: CartActionTypes.RESET_CART;
}
export interface ResetCartErrorRequestAction {
  type: CartActionTypes.RESET_CART_ERROR;
}
export type OrdersAction =
  | AddToCartRequestAction
  | ResetCartRequestAction
  | ResetCartErrorRequestAction;

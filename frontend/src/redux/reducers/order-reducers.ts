// orders/reducers.ts

import { OrdersAction, OrdersActionTypes } from "../actions/order-actions";
import { OrdersState } from "../types";

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

export const ordersReducer = (
  state = initialState,
  action: OrdersAction
): OrdersState => {
  switch (action.type) {
    case OrdersActionTypes.FETCH_ORDERS_REQUEST:
    case OrdersActionTypes.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };
    case OrdersActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false,
        error: null,
      };
    case OrdersActionTypes.FETCH_ORDERS_FAILURE:
    case OrdersActionTypes.CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

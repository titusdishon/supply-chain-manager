import { Order } from "../types";

export enum OrdersActionTypes {
  FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST",
  FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS",
  FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE",
  CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST",
  CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS",
  CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE",
}

export interface FetchOrdersRequestAction {
  type: OrdersActionTypes.FETCH_ORDERS_REQUEST;
}

export interface FetchOrdersSuccessAction {
  type: OrdersActionTypes.FETCH_ORDERS_SUCCESS;
  payload: Order[];
}

export interface FetchOrdersFailureAction {
  type: OrdersActionTypes.FETCH_ORDERS_FAILURE;
  payload: string;
}

export interface CreateOrderRequestAction {
  type: OrdersActionTypes.CREATE_ORDER_REQUEST;
}

export interface CreateOrderSuccessAction {
  type: OrdersActionTypes.CREATE_ORDER_SUCCESS;
  payload: Order;
}

export interface CreateOrderFailureAction {
  type: OrdersActionTypes.CREATE_ORDER_FAILURE;
  payload: string;
}

export type OrdersAction =
  | FetchOrdersRequestAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailureAction
  | CreateOrderRequestAction
  | CreateOrderSuccessAction
  | CreateOrderFailureAction;

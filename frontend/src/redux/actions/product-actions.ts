import { Product } from "../types";

export enum ProductsActionTypes {
  FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST",
  FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE",
  ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST",
  ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS",
  ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE",
}

export interface FetchProductsRequestAction {
  type: ProductsActionTypes.FETCH_PRODUCTS_REQUEST;
}

export interface FetchProductsSuccessAction {
  type: ProductsActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
}

export interface FetchProductsFailureAction {
  type: ProductsActionTypes.FETCH_PRODUCTS_FAILURE;
  payload: string;
}

export interface AddProductRequestAction {
  type: ProductsActionTypes.ADD_PRODUCT_REQUEST;
  payload: Product;
}

export interface AddProductSuccessAction {
  type: ProductsActionTypes.ADD_PRODUCT_SUCCESS;
  payload: Product;
}

export interface AddProductFailureAction {
  type: ProductsActionTypes.ADD_PRODUCT_FAILURE;
  payload: string;
}

export type ProductsAction =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | AddProductRequestAction
  | AddProductSuccessAction
  | AddProductFailureAction;

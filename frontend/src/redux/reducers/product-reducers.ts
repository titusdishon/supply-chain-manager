// products/reducers.ts

import {
  ProductsAction,
  ProductsActionTypes,
} from "../actions/product-actions";
import { ProductsState } from "../types";

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = (
  state = initialState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case ProductsActionTypes.FETCH_PRODUCTS_REQUEST:
    case ProductsActionTypes.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ProductsActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case ProductsActionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
        error: null,
      };
    case ProductsActionTypes.FETCH_PRODUCTS_FAILURE:
    case ProductsActionTypes.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

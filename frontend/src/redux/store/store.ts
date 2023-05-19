import { createStore, combineReducers, Store } from "redux";
import { OrdersState, ProductsState } from "../types";
import { productsReducer } from "../reducers/product-reducers";
import { ordersReducer } from "../reducers/order-reducers";

export interface RootState {
  order: OrdersState;
  product: ProductsState;
}

const rootReducer = combineReducers<RootState>({
  order: ordersReducer,
  product: productsReducer,
});

const store: Store<RootState> = createStore(rootReducer);

export default store;

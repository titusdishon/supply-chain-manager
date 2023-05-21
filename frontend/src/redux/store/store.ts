import { createStore, combineReducers, Store } from "redux";
import { OrdersState, ProductsState } from "../types";
import { productsReducer } from "../reducers/product-reducers";
import { ordersReducer } from "../reducers/order-reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export interface RootState {
  order: OrdersState;
  product: ProductsState;
}

const rootReducer = combineReducers<RootState>({
  order: ordersReducer,
  product: productsReducer,
});

const store: Store<RootState> = createStore(rootReducer, composeWithDevTools());

export default store;

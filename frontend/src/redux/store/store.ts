import { createStore, combineReducers, Store } from "redux";
import { AuthState, OrdersState } from "../types";
import { ordersReducer } from "../reducers/order-reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "../reducers/auth-reducers";

export interface RootState {
  order: OrdersState;
  user: AuthState;
}

const rootReducer = combineReducers<RootState>({
  order: ordersReducer,
  user: authReducer,
});

const store: Store<RootState> = createStore(rootReducer, composeWithDevTools());

export default store;

import { createStore, combineReducers, Store } from "redux";
import { AuthState, CartState } from "../types";
import { cartReducer } from "../reducers/cart-reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "../reducers/auth-reducers";

export interface RootState {
  cart: CartState;
  user: AuthState;
}

const rootReducer = combineReducers<RootState>({
  cart: cartReducer,
  user: authReducer,
});

const store: Store<RootState> = createStore(rootReducer, composeWithDevTools());

export default store;

// user/reducers.ts

import { UserAction, UserActionTypes } from "../actions/user-actions";
import { UserState } from "../types";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case UserActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

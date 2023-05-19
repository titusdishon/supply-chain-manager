import { RegistrationFormData } from "../types";

export enum UserActionTypes {
  FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE",
  CREATE_USER_REQUEST = "CREATE_USER_REQUEST",
  CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
  CREATE_USER_FAILURE = "CREATE_USER_FAILURE",
  UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE",
}

export interface FetchUsersRequestAction {
  type: UserActionTypes.FETCH_USERS_REQUEST;
}

export interface FetchUsersSuccessAction {
  type: UserActionTypes.FETCH_USERS_SUCCESS;
  payload: RegistrationFormData[];
}

export interface FetchUsersFailureAction {
  type: UserActionTypes.FETCH_USERS_FAILURE;
  payload: string;
}

export interface CreateUserRequestAction {
  type: UserActionTypes.CREATE_USER_REQUEST;
  payload: RegistrationFormData;
}

export interface CreateUserSuccessAction {
  type: UserActionTypes.CREATE_USER_SUCCESS;
  payload: RegistrationFormData;
}

export interface CreateUserFailureAction {
  type: UserActionTypes.CREATE_USER_FAILURE;
  payload: string;
}

export interface UpdateUserRequestAction {
  type: UserActionTypes.UPDATE_USER_REQUEST;
  payload: RegistrationFormData;
}

export interface UpdateUserSuccessAction {
  type: UserActionTypes.UPDATE_USER_SUCCESS;
  payload: RegistrationFormData;
}

export interface UpdateUserFailureAction {
  type: UserActionTypes.UPDATE_USER_FAILURE;
  payload: string;
}

export type UserAction =
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction;

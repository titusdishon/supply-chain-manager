import { User } from "../types";

export enum AuthActionTypes {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
}

export interface LoginRequestAction {
  type: AuthActionTypes.LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: User | string | null;
}

export interface LoginFailureAction {
  type: AuthActionTypes.LOGIN_FAILURE;
  payload: string;
}

export interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

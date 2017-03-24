import { set } from 'monolite';
import { Action } from '@ngrx/store';

import { ActionHandlers } from 'app/store';

export const types = {
  login: 'LOGIN',
  loginSuccess: 'LOGIN_SUCCESS',
  loginFailed: 'LOGIN_FAILED'
};

const login = (payload: string): Action => ({ type: types.login, payload });
const loginSuccess = (): Action => ({ type: types.loginSuccess });
const loginFailed = (): Action => ({ type: types.loginFailed });

export const actions = {
  login, loginSuccess, loginFailed
};

export const loginHandlers: ActionHandlers<LoginState> = {
  [types.login]: loginHandler,
  [types.loginSuccess]: loginSuccessHandler,
  [types.loginFailed]: loginFailedHandler
};

function loginHandler(state: LoginState, _email: string) {
  return set(state, (s) => s)(
    (_s) => ({ inProgress: true, success: false, failed: false }));
}

function loginSuccessHandler(state: LoginState) {
  return set(state, (s) => s)(
    (_s) => ({ inProgress: false, success: true, failed: false }));
}

function loginFailedHandler(state: LoginState) {
  return set(state, (s) => s)(
    (_s) => ({ inProgress: false, success: false, failed: true }));
}

export interface LoginState {
  inProgress: boolean;
  success: boolean;
  failed: boolean;
}

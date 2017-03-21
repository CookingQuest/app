import { Action } from '@ngrx/store';

import { ActionHandlers } from 'app/store';

export const types = {
  register: 'REGISTER'
};

const register = (payload: string): Action => ({ type: types.register, payload });

export const actions = {
  register
};

export const loginHandlers: ActionHandlers<LoginState> = {
  [types.register]: registerHandler
};

function registerHandler(state: LoginState, _payload: string) {
  return 'state';
}

export interface LoginState { }

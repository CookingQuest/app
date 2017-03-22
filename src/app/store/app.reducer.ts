import { compose } from '@ngrx/core/compose';
import { combineReducers, ActionReducer, Action } from '@ngrx/store';
import { routerReducer as router, RouterState } from '@ngrx/router-store';

import { stateSetter, setRootState } from './hmr';
import { userHandlers, UserState } from 'app/core';
import { loginHandlers } from 'app/login';

export const actions = { setRootState };

export interface AppState {
  user: UserState;
  router: RouterState;
}

const reducers = {
  router,
  user: createReducer(userHandlers),
  login: createReducer(loginHandlers)
};

const developmentReducer = compose(stateSetter, combineReducers)(reducers);
const productionReducer = compose(combineReducers)(reducers);

export function rootReducer(state: AppState = initial_state, action: any) {
  return ENV !== 'development' ?
    productionReducer(state, action) : developmentReducer(state, action);
}

function createReducer<T>(handlers: ActionHandlers<T>): ActionReducer<T> {
  return (state: T, action: Action) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action.payload) : state;
  };
};

export type ActionHandlers<T> = {
  [key: string]: (state: T, payload?: any) => T;
};

import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { routerReducer as router, RouterState } from '@ngrx/router-store';

import { stateSetter, setRootState } from './hmr';
import { userReducer, UserState } from 'app/core';
import { reducer as tutorial } from 'app/tutorial';

export const actions = { setRootState };

export interface AppState {
  user: UserState;
  router: RouterState;
}

export type InternalStateType = {
  [key: string]: any
};

const reducers = {
  router,
  user: userReducer,
  tutorial
};

const developmentReducer = compose(stateSetter, combineReducers)(reducers);
const productionReducer = compose(combineReducers)(reducers);

export function rootReducer(state: AppState = initial_state, action: any) {
  return ENV !== 'development' ?
    productionReducer(state, action) : developmentReducer(state, action);
}

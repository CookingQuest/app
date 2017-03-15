import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { routerReducer as router, RouterState } from '@ngrx/router-store';

import { stateSetter, setRootState } from './hmr';
import { user, UserState } from 'app/user/reducers';
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
  user,
  tutorial
};

const developmentReducer = compose(stateSetter, combineReducers)(reducers);
const productionReducer = compose(combineReducers)(reducers);

export function getAppState(): AppState {
  return <AppState> initial_state;
}

export function rootReducer(state: any, action: any) {
  return ENV !== 'development' ?
    productionReducer(state, action) : developmentReducer(state, action);
}

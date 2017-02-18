import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { fromJS, Map } from 'immutable';
import { routerReducer as router, RouterState } from '@ngrx/router-store';

import { stateSetter, setRootState } from './hmr';
import { user } from 'app/user/reducers';
import { reducer as tutorial } from 'app/tutorial';

export const actions = { setRootState };

export interface AppState {
  user: Map<string, any>;
  router: RouterState;
}

const reducers = {
  router,
  user,
  tutorial
};

const developmentReducer = compose(stateSetter, combineReducers)(reducers);
const productionReducer = compose(combineReducers)(reducers);

export const rootReducer = (state: any, action: any) =>
  ENV !== 'development' ? productionReducer(state, action) : developmentReducer(state, action);

export const readInitialState = (): AppState => {
  return Object.entries(initial_state).reduce(
    (state: AppState, [key, val]) => ({ ...state, [key]: fromJS(val) }),
    (<AppState> {})
  );
};

import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { fromJS, Map } from 'immutable';
import { stateSetter, setRootState } from './hmr';
import { user } from 'app/user/reducers';

export const initialState: AppState = readInitialState();

export const actions = { setRootState };

export interface AppState {
  user: Map<string, any>;
}

const reducers = {
  user
};

const developmentReducer = compose(stateSetter, combineReducers)(reducers);
const productionReducer = compose(combineReducers)(reducers);

export const rootReducer = (state: any, action: any) =>
  ENV !== 'development' ? productionReducer(state, action) : developmentReducer(state, action);

function readInitialState() {
  return Object.entries((<any>window).initial_state)
    .reduce((state: AppState, [key, val]) => ({ ...state, [key]: fromJS(val) }),
            (<AppState>{}));
}

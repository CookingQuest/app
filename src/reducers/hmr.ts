import { ActionReducer } from '@ngrx/store';

const SET_ROOT_STATE = 'SET_ROOT_STATE';

export const setRootState = (payload) => ({ type: SET_ROOT_STATE, payload });

export const stateSetter: ActionReducer<any> = (reducer: ActionReducer<any>) =>
  (state, action) => {
    if (action.type === SET_ROOT_STATE) {
      return action.payload;
    }
    return reducer(state, action);
  };

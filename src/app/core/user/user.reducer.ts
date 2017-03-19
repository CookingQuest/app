import iassign from 'immutable-assign';
import { Action } from '@ngrx/store';

export const userActions = {
  gainExp
};

const GAIN_EXP = 'GAIN_EXP';
const ACTION_HANDLERS = {
  [GAIN_EXP]: gainExpHandler
};

function gainExp(payload: number = 1): Action {
  return { type: GAIN_EXP, payload };
}

function gainExpHandler(state: UserState, gainedExp: number): UserState {
  return iassign(state, (s) => s.stats, (stats) => {
    const exp = stats.exp + gainedExp;
    const levelUps = Math.floor(exp / 1000);
    const restExp = exp % 1000;
    stats.level += levelUps;
    stats.exp = restExp;
    return stats;
  });
}

export function userReducer(state: UserState, action: Action): UserState {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}

export interface UserState {
  stats: {
    level: number;
    exp: number;
  };

}

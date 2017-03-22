import { set } from 'monolite';
import { Action } from '@ngrx/store';

import { ActionHandlers } from 'app/store';

export const actions = {
  gainExp
};

export const types = {
  gain_exp: 'GAIN_EXP'
};

export const userHandlers: ActionHandlers<UserState> = {
  [types.gain_exp]: gainExpHandler
};

function gainExp(payload: number = 1): Action {
  return { type: types.gain_exp, payload };
}

function gainExpHandler(state: UserState, gainedExp: number): UserState {
  return set(state, (s) => s.stats)((stats) => {
    const exp = stats.exp + gainedExp;
    const levelUps = Math.floor(exp / 1000);
    const restExp = exp % 1000;
    stats.level += levelUps;
    stats.exp = restExp;
    return stats;
  });
}

export interface UserState {
  name: string;
  stats: {
    level: number;
    exp: number;
  };
}

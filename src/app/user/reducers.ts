import { Map } from 'immutable';

const GAIN_EXP = 'GAIN_EXP';

const gainExp = (payload = 1) => ({ type: GAIN_EXP, payload });

export const userActions = {
  gainExp
};

const ACTION_HANDLERS = {
  [GAIN_EXP]: gainExpHandler
};

function gainExpHandler(state: Map<string, any>, payload: Object) {
  const exp = state.getIn(['stats', 'exp']) + payload;
  let levelUps = exp / 1000;
  const restExp = exp % 1000;
  levelUps = Math.floor(levelUps);
  return state.updateIn(['stats', 'level'], (v) => v + levelUps)
    .updateIn(['stats', 'exp'], (v) => restExp);
}

export function user(state: Map<string, any>, action: any) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}

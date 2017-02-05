import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ApiService } from 'api';

const REGISTER = 'REGISTER';

const register = payload => ({ type: REGISTER, payload });

export const actions = {
  register
};

const ACTION_HANDLERS = {
  [REGISTER]: registerHandler
};

function registerHandler(_state, payload) {
  return _state;
}

export const reducer = (state, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}

@Injectable()
export class AuthEffects {
  constructor(private api: ApiService, private actions$: Actions) { }

  @Effect() login$ = this.actions$
    .ofType(REGISTER)
    .map(toPayload)
    .switchMap(
      payload => this.api.callMethod('register', payload)
        .then(res => ({ type: 'LOGIN_SUCCESS', payload: res }))
        .catch(() => Observable.of({ type: 'LOGIN_FAILED' }))
          );
}

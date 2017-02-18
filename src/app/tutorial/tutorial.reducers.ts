import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';

import { ApiService } from 'api';

const REGISTER = 'REGISTER';

const register = (payload: any) => ({ type: REGISTER, payload });

export const actions = {
  register
};

const ACTION_HANDLERS = {
  [REGISTER]: registerHandler
};

function registerHandler(_state: Map<string, any>, payload: any) {
  return _state;
}

export function reducer (state: Map<string, any>, action: any) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
};

@Injectable()
export class AuthEffects {
  @Effect() public login$: Observable<any>;

  constructor(private api: ApiService, private actions$: Actions) {
    this.login$ = this.actions$
      .ofType(REGISTER)
      .map(toPayload)
      .switchMap(
        (payload) => this.api.callMethod('register', payload)
          .then((res: any) => ({ type: 'LOGIN_SUCCESS', payload: res }))
          .catch(() => Observable.of({ type: 'LOGIN_FAILED' }))
            );
  }
}

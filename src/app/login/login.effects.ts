import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/core';
import { types } from './login.reducer';

@Injectable()
export class LoginEffects {
  @Effect() public login$: Observable<Action>;

  constructor(private api: ApiService, private actions$: Actions) {
    this.login$ = this.actions$
      .ofType(types.register)
      .map(toPayload)
      .switchMap(
      (payload) => this.api.callMethod('register', payload)
        .then((res: any) => ({ type: 'LOGIN_SUCCESS', payload: res }))
        .catch(() => Observable.of({ type: 'LOGIN_FAILED' }))
      );
  }
}

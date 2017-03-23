import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/core';
import { actions, types } from './login.reducer';

@Injectable()
export class LoginEffects {
  @Effect() public login$: Observable<Action>;

  constructor(private api: ApiService, private actions$: Actions) {
    this.login$ = this.actions$
      .ofType(types.login)
      .map(toPayload)
      .switchMap(
      (payload) => this.api.callMethod('register', payload)
        .then((res: any) => actions.loginSuccess())
        .catch(() => Observable.of(actions.loginFailed()))
      );
  }
}

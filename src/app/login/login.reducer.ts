import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/core';

const REGISTER = 'REGISTER';

const register = (payload: string) => ({ type: REGISTER, payload });

export const actions = {
    register
};

const ACTION_HANDLERS = {
    [REGISTER]: registerHandler
};

function registerHandler(_state: Map<string, any>, payload: string) {
    return _state;
}

export function loginReducer(state: Map<string, any>, action: Action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action.payload) : state;
};

@Injectable()
export class AuthEffects {
    @Effect() public login$: Observable<Action>;

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

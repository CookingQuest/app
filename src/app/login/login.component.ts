import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'app/store';
import { actions } from './login.reducer';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public email = new FormControl();

    constructor(private store: Store<AppState>) { }

    public register() {
        this.store.dispatch(actions.register(this.email.value));
    }
}

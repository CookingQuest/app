import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'app/store';
import { actions } from './login.reducer';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email = new FormControl();

  constructor(private store: Store<AppState>) { }

  public login() {
    this.store.dispatch(actions.login(this.email.value));
  }
}

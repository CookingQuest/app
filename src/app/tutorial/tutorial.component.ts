import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'app/store';
import { actions } from './tutorial.reducers';

@Component({
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent {
  public email = new FormControl();

  constructor(private store: Store<AppState>) {}

  public register() {
    this.store.dispatch(actions.register(this.email.value));
  }
}

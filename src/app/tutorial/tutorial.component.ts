import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'reducers';
import { actions } from '.';

@Component({
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent {
  email: string;

  constructor(private store: Store<AppState>) {}
  
  register() {
    this.store.dispatch(actions.register(this.email))
  }
}

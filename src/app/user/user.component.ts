import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from 'reducers';
import { userActions, UserState } from './reducers';

@Component({
  selector: 'user',
  styleUrls: [
    './user.component.css'
  ],
  templateUrl: './user.component.html'
})
export class UserComponent {

  public user: Observable<UserState>;

  constructor(private store: Store<AppState>) {
    this.user = store.select((s) => s.user);
  }

  public gainExp() {
    this.store.dispatch(userActions.gainExp(999));
  }
}

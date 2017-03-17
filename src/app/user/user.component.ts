import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from 'app/store';
import { UserState, userActions } from './reducers';

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

  public logout() {
    this.store.dispatch(userActions.gainExp());
  }
}

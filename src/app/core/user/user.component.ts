import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'app/store';
import { actions, UserState } from './user.reducer';

@Component({
  selector: 'user',
  styleUrls: [
    './user.component.css'
  ],
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {

  @Input() public user: UserState;

  constructor(private store: Store<AppState>) { }

  public logout() {
    this.store.dispatch(actions.gainExp());
  }
}

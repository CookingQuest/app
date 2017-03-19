import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from 'app/store';
import { UserState } from 'app/core/user';

@Component({
  selector: 'header',
  styleUrls: [
    './header.component.css'
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  public user: Observable<UserState>;

  constructor(store: Store<AppState>) {
    this.user = store.select((s) => s.user);
  }
}

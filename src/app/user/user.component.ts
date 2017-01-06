import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';
import { Store } from '@ngrx/store';
import { AppState } from 'reducers';
import { userActions } from './reducers';

@Component({
    selector: 'user',
    styleUrls: [
        './user.component.css'
    ],
    templateUrl: './user.component.html'
})
export class UserComponent {

    user: Observable<Map<string, any>>;

    constructor(private store: Store<AppState>) {
        this.user = store.select(s => s.user);
    }

    gainExp() {
        this.store.dispatch(userActions.gainExp(999));
    }
}

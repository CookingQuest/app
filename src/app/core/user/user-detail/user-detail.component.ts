import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

import { UserState } from '../user.reducer';

@Component({
  selector: 'user-detail',
  styleUrls: ['./user-detail.component.css'],
  templateUrl: './user-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent {

  @Input() public user: UserState;
  @Output() private onLogout = new EventEmitter();

  public logout() { this.onLogout.emit(); }
}

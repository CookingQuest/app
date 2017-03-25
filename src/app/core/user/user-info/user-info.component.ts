import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { UserState } from '../user.reducer';

@Component({
  selector: 'user-info',
  styleUrls: ['./user-info.component.css'],
  templateUrl: './user-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {

  @Input() public user: UserState;
}

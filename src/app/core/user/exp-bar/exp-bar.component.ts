import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'exp-bar',
  templateUrl: './exp-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpBarComponent implements OnChanges {

  @Input() public exp: number;
  public percentage: number;
  public nextLvl: number;

  public ngOnChanges() {
    this.percentage = 0.5;
    this.nextLvl = this.exp * 2;
  }
}

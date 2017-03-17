import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rect-btn',
  styleUrls: [
    './rect-btn.component.css'
  ],
  templateUrl: './rect-btn.component.html'
})
export class RectBtnComponent {
  @Output() private onClick = new EventEmitter();

  public click() {
    this.onClick.emit();
  }
}

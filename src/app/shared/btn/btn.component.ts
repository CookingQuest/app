import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'btn',
  styleUrls: [
    './btn.component.css'
  ],
  templateUrl: './btn.component.html'
})
export class BtnComponent {
  @Output() private onClick = new EventEmitter();

  public click() {
    this.onClick.emit();
  }
}

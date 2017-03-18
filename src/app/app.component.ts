import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from 'app/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  constructor(private api: ApiService) {}

  public ngOnInit() {
    this.api.connect();
  }
}

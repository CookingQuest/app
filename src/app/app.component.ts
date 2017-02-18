import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { ROUTES } from './app.routes';
import { ApiService } from 'api';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  public routes = ROUTES;

  constructor(private api: ApiService) {}

  public ngOnInit() {
    this.api.connect();
  }
}

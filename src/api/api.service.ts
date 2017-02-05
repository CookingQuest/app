import { Injectable } from '@angular/core';

import { Websocket } from './websocket';

@Injectable()
export class ApiService {

  private ws: Websocket;

  connect = () => {
    this.ws = new Websocket();
  }

  public callMethod = (method, params) => this.ws.api(method, params);
}

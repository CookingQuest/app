import { Injectable } from '@angular/core';

import { Websocket } from './websocket';

@Injectable()
export class ApiService {

  private ws: Websocket;

  public connect = () => {
    this.ws = new Websocket();
  }

  public callMethod = (method: string, params: string[]) => this.ws.api(method, params);
}

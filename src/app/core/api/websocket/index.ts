import { Socket } from './phoenix';

export class Websocket {
  private graphqlChannel: any;
  private apiChannel: any;

  constructor() {
    let socket = new Socket('/socket', {params: {}});
    if (ENV === 'development') {
      socket.onError(() => socket.disconnect());
    }
    socket.connect();

    this.graphqlChannel = socket.channel('graphql', {});
    this.graphqlChannel.join();

    this.apiChannel = socket.channel('api', {});
    this.apiChannel.join();
  }

  public api(method: string, params: string[]) {
    return new Promise(
      (resolve) => this.apiChannel.push('call', {method, params}, 5000)
        .receive('ok', ({data}: Response) => resolve(data))
    );
  }

  public gql() {
    // todo
  }
}

interface Response {
  data: any;
}

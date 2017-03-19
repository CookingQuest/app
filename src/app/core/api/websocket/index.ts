import { Socket, Channel } from './phoenix';

export class Websocket {
  private graphqlChannel: Channel;
  private apiChannel: Channel;
  private stateChannel: Channel;

  constructor() {
    const socket = new Socket('/socket', {params: {}});
    socket.connect();

    this.graphqlChannel = socket.channel('graphql', {});
    this.graphqlChannel.join();

    this.apiChannel = socket.channel('api', {});
    this.apiChannel.join();

    this.stateChannel = socket.channel('state', {});
    this.stateChannel.join();
  }

  public api(method: string, params: object) {
    return new Promise(
      (resolve) => this.apiChannel.push(method, params, 5000)
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

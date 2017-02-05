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
    this.graphqlChannel.join()
      .receive('ok', resp => { console.log('Joined successfully', resp); })
      .receive('error', resp => { console.log('Unable to join', resp); });

    this.apiChannel = socket.channel('api', {});
    this.apiChannel.join()
      .receive('ok', resp => { console.log('Joined successfully', resp); })
      .receive('error', resp => { console.log('Unable to join', resp); });
  }

  api(method, ...params) {
    return new Promise(
      resolve => this.apiChannel.push('call', {method, params}, 5000)
        .receive("ok", ({data}) => resolve(data))
    );
  }

  gql() {}
}

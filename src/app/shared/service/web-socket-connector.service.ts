import {Injectable} from "@angular/core";
import {RxStompConfig} from "@stomp/rx-stomp";

export const myRxStompConfig: RxStompConfig = {
  // Which server?
  brokerURL: 'ws://localhost:8080/ws',

  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds
  reconnectDelay: 200,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};

declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class WebSocketConnector {

  public stompClient: any | null = null;

  constructor() {
  }

  connect(serverUrl: string): void {
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);

    try {
      this.stompClient.connect({}, function (frame: any) {
        console.log('Connected: ' + frame);
      });
    } catch (error) {
      console.error(error);
    }
  }

  subscribe(url: string, callback: (result: any) => any): void {
    if (!this.stompClient) {
      throw new Error('Web socket server is not connected')
    }
    return this.stompClient.subscribe(url, callback);
  }

}

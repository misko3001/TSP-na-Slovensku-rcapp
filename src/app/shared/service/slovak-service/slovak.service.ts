import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SlovakRequestDto} from "../../model/SlovakRequestDto";
import {WebSocketConnector} from "../web-socket-connector.service";
import {FinalSlovakResult} from "../../model/FinalSlovakResult";

@Injectable({
  providedIn: 'root'
})
export class SlovakService {

  // TODO move to config
  private slovakEndpoint = 'http://localhost:8080/api/' + 'tsp/slovak';

  constructor(private http: HttpClient, private wsConnector: WebSocketConnector) {
  }

  public calculate(request: SlovakRequestDto): Observable<FinalSlovakResult> {
    return this.http.post<FinalSlovakResult>(`${this.slovakEndpoint}`, request);
  }

  public getTemporaryResults(id: string, callback: (value: any) => any): any {
    return this.wsConnector.subscribe(`/tsp/active/${id}`, callback);
  }
}

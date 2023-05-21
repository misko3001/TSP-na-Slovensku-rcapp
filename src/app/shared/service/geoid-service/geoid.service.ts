import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeoidRequestDto} from "../../model/GeoidRequestDto";
import {Observable} from "rxjs";
import {TSPResult} from "../../model/TSPResult";

@Injectable({
  providedIn: 'root'
})
export class GeoidService {

  // TODO move to config
  private geoidEndpoint = 'http://localhost:8080/api/' + 'tsp/geoid';

  constructor(private http: HttpClient) { }

  public calculate(request: GeoidRequestDto): Observable<TSPResult> {
    return this.http.post<TSPResult>(`${this.geoidEndpoint}`, request);
  }

}

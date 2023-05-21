import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {WaypointDto} from "../../model/WaypointDto";
import {HttpClient} from "@angular/common/http";
import {RouteDto} from "../../model/RouteDto";
import {RouteRequestDto} from "../../model/RouteRequestDto";

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  // TODO move to config
  private dataEndpoint = 'http://localhost:8080/api/' + 'data/slovakia';

  private jsonPoints?: string;

  constructor(private http: HttpClient) {}

  public async getPoints(): Promise<WaypointDto[]> {
    return new Promise((resolve) => {
      if (this.jsonPoints == null) {
        this.loadPoints().subscribe(points => {
          this.jsonPoints = JSON.stringify(points);
          resolve(JSON.parse(this.jsonPoints));
        });
      } else { resolve(JSON.parse(this.jsonPoints)); }
    });
  }

  private loadPoints(): Observable<WaypointDto[]> {
    return this.http.get<WaypointDto[]>(`${this.dataEndpoint}` + `/points`);
  }

  public getRoute(req: RouteRequestDto): Observable<RouteDto> {
    return this.http.get<RouteDto>(`${this.dataEndpoint}/routes/${req.startPoint}/${req.endPoint}`);
  }
}

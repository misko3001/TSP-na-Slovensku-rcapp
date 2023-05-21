export class RouteDto {

  distance: number;

  startPoint: string;

  endPoint: string;

  polyline: string;

  constructor(distance: number, startPoint: string, endPoint: string, polyline: string) {
    this.distance = distance;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.polyline = polyline;
  }
}

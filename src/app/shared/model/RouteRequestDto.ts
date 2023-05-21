export class RouteRequestDto {

  startPoint: string;

  endPoint: string;

  constructor(startPoint: string, endPoint: string) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }
}

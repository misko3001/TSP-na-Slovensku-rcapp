export class GeoidResult {

  route: string[];

  length: number;

  generations: number;

  duration: number;

  gpx: string;

  constructor(route: string[], length: number, generations: number, duration: number, gpx: string) {
    this.route = route;
    this.length = length;
    this.generations = generations;
    this.duration = duration;
    this.gpx = gpx;
  }
}

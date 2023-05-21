export class TSPResult {

  shortestPath: string[];

  fullLength: number;

  distances: number[];

  gpx: string;

  constructor(shortestPath: string[], kmLength: number, distances: number[], gpx: string) {
    this.shortestPath = shortestPath;
    this.fullLength = kmLength;
    this.distances = distances;
    this.gpx = gpx;
  }
}

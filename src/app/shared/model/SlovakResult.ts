export class SlovakResult {

  generation: number;

  route: string[];

  length: number;

  constructor(route: string[], length: number, id: number) {
    this.route = route;
    this.length = length;
    this.generation = id;
  }
}

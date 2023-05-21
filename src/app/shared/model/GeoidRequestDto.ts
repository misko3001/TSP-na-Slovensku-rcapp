import {WaypointDto} from "./WaypointDto";

export class GeoidRequestDto {

  waypoints?: Array<WaypointDto>;

  maxIterations: number;

  swapMutationChance: number;

  crossoverChance: number;

  constructor(waypoints: Array<WaypointDto>, maxIterations: number, swapMutationChance: number, crossoverChance: number) {
    this.waypoints = waypoints;
    this.maxIterations = maxIterations;
    this.swapMutationChance = swapMutationChance;
    this.crossoverChance = crossoverChance;
  }
}

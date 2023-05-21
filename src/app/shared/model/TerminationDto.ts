import {ExecutionTime} from "./ExecutionTime";

export class TerminationDto {

  maxGenerations: number;

  maxSteadyFitnessGenerations: number | null;

  chronoUnit: ExecutionTime | null;

  chronoValue: number | null;

  shortFilter: number | null

  longFilter: number | null;

  epsilon: number | null;


  constructor(maxGenerations: number, maxSteadyFitnessGenerations: number | null, chronoUnit: ExecutionTime | null, chronoValue: number | null, shortFilter: number | null, longFilter: number | null, epsilon: number | null) {
    this.maxGenerations = maxGenerations;
    this.maxSteadyFitnessGenerations = maxSteadyFitnessGenerations;
    this.chronoUnit = chronoUnit;
    this.chronoValue = chronoValue;
    this.shortFilter = shortFilter;
    this.longFilter = longFilter;
    this.epsilon = epsilon;
  }
}

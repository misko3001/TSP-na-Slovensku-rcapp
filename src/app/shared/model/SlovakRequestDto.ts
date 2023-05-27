import {MatrixPointDto} from "./MatrixPointDto";
import {TSPSelector} from "./TSPSelector";
import {TSPMutator} from "./TSPMutator";
import {TSPCrossover} from "./TSPCrossover";
import {TerminationDto} from "./TerminationDto";

export class SlovakRequestDto {

  points?: Array<MatrixPointDto>;

  termination: TerminationDto;

  selectors: Array<TSPSelector | null>;

  selectionModifiers: Array<string | null>;

  numberOfElites: Array<number | null>;

  mutator: TSPMutator;

  mutationModifier: string | null;

  crossover: TSPCrossover;

  crossoverModifier: string | null;

  populationSize: number;

  maxPhenotypeAge: number;

  offspringFraction: number;

  processId: string | null;

  publishEachGeneration: number | null


  constructor(points: Array<MatrixPointDto>, termination: TerminationDto, selectors: Array<TSPSelector | null>, selectionModifiers: Array<string | null>, numberOfElites: Array<number | null>, mutator: TSPMutator, mutationModifier: string | null, crossover: TSPCrossover, crossoverModifier: string | null, populationSize: number, offspringFraction: number, processId: string | null, publishEachGeneration: number | null, maxPhenotypeAge: number) {
    this.points = points;
    this.termination = termination;
    this.selectors = selectors;
    this.selectionModifiers = selectionModifiers;
    this.numberOfElites = numberOfElites;
    this.mutator = mutator;
    this.mutationModifier = mutationModifier;
    this.crossover = crossover;
    this.crossoverModifier = crossoverModifier;
    this.populationSize = populationSize;
    this.offspringFraction = offspringFraction;
    this.processId = processId;
    this.publishEachGeneration = publishEachGeneration;
    this.maxPhenotypeAge = maxPhenotypeAge;
  }
}

export enum ExecutionTime {
  MILLIS = "MILLIS",
  SECONDS = "SECONDS",
  MINUTES = "MINUTES",
  HOURS = "HOURS"
}

export const ExecutionTime2LabelMapping: Record<ExecutionTime, string> = {
  [ExecutionTime.MILLIS]: "milisekúnd",
  [ExecutionTime.SECONDS]: "sekúnd",
  [ExecutionTime.MINUTES]: "minút",
  [ExecutionTime.HOURS]: "hodín"
};


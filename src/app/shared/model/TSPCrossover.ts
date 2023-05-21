export enum TSPCrossover {
  PMX = "PMX",
  CX = "CX"
}

export const TSPCrossover2LabelMapping: Record<TSPCrossover, string> = {
  [TSPCrossover.PMX]: "Kríženie s čiastočným priradením (PMX)",
  [TSPCrossover.CX]: "Cyklické kríženie (CX)",
};


export enum TSPMutator {
  SWAP = "SWAP",
  INVERSION = "INVERSION"
}

export const TSPMutator2LabelMapping: Record<TSPMutator, string> = {
  [TSPMutator.SWAP]: "Výmenná mutácia",
  [TSPMutator.INVERSION]: "Inverzná mutácia",
};

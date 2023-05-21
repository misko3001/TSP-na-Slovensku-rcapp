export enum TSPSelector {
  TOURNAMENT = "TOURNAMENT",
  BOLTZMANN = "BOLTZMANN",
  LINEAR_RANK = "LINEAR_RANK",
  EXPONENTIAL_RANK = "EXPONENTIAL_RANK",
  ROULETTE_WHEEL = "ROULETTE_WHEEL",
  MONTE_CARLO = "MONTE_CARLO",
  STOCHASTIC_UNIVERSAL = "STOCHASTIC_UNIVERSAL"
}

export const TSPSelector2LabelMapping: Record<TSPSelector, string> = {
  [TSPSelector.TOURNAMENT]: "Turnajová selekcia",
  [TSPSelector.BOLTZMANN]: "Boltzmannova selekcia",
  [TSPSelector.LINEAR_RANK]: "Selekcia lineárnou hodnosťou",
  [TSPSelector.EXPONENTIAL_RANK]: "Selekcia exponenciálnou hodnosťou",
  [TSPSelector.ROULETTE_WHEEL]: "Ruletová selekcia",
  [TSPSelector.MONTE_CARLO]: "Monte Carlo selekcia",
  [TSPSelector.STOCHASTIC_UNIVERSAL]: "Univerzálna stochastická selekcia"
};


export const TSPSelector2ModifierDescription: Record<TSPSelector, string | null> = {
  [TSPSelector.TOURNAMENT]: "Je potrebné určiť <span data-tooltip='Koľko jedincov sa vyberie z populácie do každého turnaja. Minimálny počet je 2' style='border-bottom: 1px dashed #999'>počet jedincov v turnaji</span>:",
  [TSPSelector.BOLTZMANN]: "Je potrebné definovať hodnotu <span data-tooltip='Kladné resp. záporné hodnoty zvyšujú šancu na výber jedincov s najlepšími resp. najnižšími fitness hednotami. Ak je hodnota nula, všetci jedinci majú šancu na výber 1/N' style='border-bottom: 1px dashed #999'>beta</span>:",
  [TSPSelector.LINEAR_RANK]: "Je potrebné definovať hodnotu <span data-tooltip='n-mínus určuje šancu na výber najhoršieho jedinca podľa vzorca n⁻/N. n⁻ musí byť väčšie alebo rovné nule' style='border-bottom: 1px dashed #999'>n⁻</span>:",
  [TSPSelector.EXPONENTIAL_RANK]: "Je potrebné definovať hodnotu <span data-tooltip='Ak je rovná nule, tak najlepší jedinec má 100% šancu na výber, zatiaľ čo hodnoty blízko 1 vyrovnávajú šancu na výber medzi všetkými jedincami. c=[0,1)' style='border-bottom: 1px dashed #999'>c</span>:",
  [TSPSelector.ROULETTE_WHEEL]: null,
  [TSPSelector.MONTE_CARLO]: null,
  [TSPSelector.STOCHASTIC_UNIVERSAL]: null,
};

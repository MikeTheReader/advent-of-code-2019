export interface Reagent {
  chemical: string;
  quantity: number;
}

export interface Reaction {
  [outputChemical: string]: {
    inputs: Reagent[];
    outputQuantity: number;
  };
}

export function parseReaction(reactionStr: string): Reaction {
  return null;
}

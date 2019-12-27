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
  const inputAndOutput = reactionStr.split('=>');
  const output = inputAndOutput[1]
    .trim()
    .split(' ')
    .map(x => x.trim());
  const inputs = inputAndOutput[0].split(',');
  const reaction = {
    [output[1]]: {
      inputs: [],
      outputQuantity: +output[0]
    }
  };
  inputs.forEach(input => {
    const quantityAndChemical = input
      .trim()
      .split(' ')
      .map(x => x.trim());
    reaction[output[1]].inputs.push({
      chemical: quantityAndChemical[1],
      quantity: +quantityAndChemical[0]
    });
  });
  return reaction;
}

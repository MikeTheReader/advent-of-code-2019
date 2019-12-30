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

export function parseAllReactions(reactionStrings: string[]): Reaction {
  const reactionMap = {};
  reactionStrings.forEach(reactionStr => {
    const reaction = parseReaction(reactionStr);
    Object.assign(reactionMap, reaction);
  });
  return reactionMap;
}

export function calculateOre(reactionStrings: string[]): number {
  const reactionMap = parseAllReactions(reactionStrings);
  let oreRequired = 0;
  const currentInventory = {};
  function createComponents(chemical: string, quantity: number) {
    // tslint:disable-next-line: no-console
    // console.debug(`Need ${quantity} - ${chemical}`);
    const inputs = reactionMap[chemical].inputs;
    const outputQuantity = reactionMap[chemical].outputQuantity;
    inputs.forEach(input => {
      if (input.chemical === 'ORE') {
        // tslint:disable-next-line: no-console
        // console.debug(`Getting ${input.quantity} ORE`);
        oreRequired += input.quantity;
      } else {
        if (currentInventory[input.chemical] && currentInventory[input.chemical] >= input.quantity) {
          // console.debug(`Taking ${input.quantity} of ${input.chemical} from leftovers`);
          currentInventory[input.chemical] -= input.quantity;
        } else {
          createComponents(input.chemical, input.quantity);
        }
      }
    });
    // tslint:disable-next-line: no-console
    // console.debug(`Created ${outputQuantity} ${chemical}`);
    if (outputQuantity > quantity) {
      if (!currentInventory[chemical]) {
        currentInventory[chemical] = 0;
      }
      currentInventory[chemical] += outputQuantity - quantity;
      // console.debug(`Current leftovers for ${chemical} = ${currentInventory[chemical]}`);
    }
    if (outputQuantity < quantity) {
      let bumpedQuantity = outputQuantity;
      if (currentInventory[chemical]) {
        // console.log(currentInventory[chemical], quantity - outputQuantity)
        const bumpFromInventory = Math.min(currentInventory[chemical], quantity - outputQuantity);
        currentInventory[chemical] -= bumpFromInventory;
        bumpedQuantity += bumpFromInventory;
        // console.debug(`Adding leftovers for ${chemical} = ${bumpFromInventory}`);
      }
      if (bumpedQuantity < quantity) {
        // console.debug(`Didn't make enough ${chemical}, making ${quantity - bumpedQuantity} more.`)
        createComponents(chemical, quantity - bumpedQuantity);
      }
    }
  }
  createComponents('FUEL', 1);
  return oreRequired;
}

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

export function calculateOre(reactionStrings: string[], fuelQuantity: number = 1): number {
  const reactionMap = parseAllReactions(reactionStrings);
  const currentInventory = {};
  let oreRequired = 0;
  function createComponents(chemical: string, quantity: number) {
    debugLog(`Need ${quantity} - ${chemical}`);
    const inputs = reactionMap[chemical].inputs;
    let outputQuantity = reactionMap[chemical].outputQuantity;
    let multiplier = 1;
    if (outputQuantity < quantity) {
      multiplier = Math.ceil(quantity / outputQuantity);
      debugLog(`Need to multiply reaction by ${multiplier}`);
    }
    inputs.forEach(input => {
      const inputQuantity = input.quantity * multiplier;
      if (input.chemical === 'ORE') {
        debugLog(`Getting ${inputQuantity} ORE`);
        oreRequired += inputQuantity;
      } else {
        if (currentInventory[input.chemical] && currentInventory[input.chemical] >= inputQuantity) {
          debugLog(`Taking ${inputQuantity} of ${input.chemical} from leftovers`);
          currentInventory[input.chemical] -= inputQuantity;
        } else {
          createComponents(input.chemical, inputQuantity);
        }
      }
    });

    outputQuantity *= multiplier;
    debugLog(`Created ${outputQuantity} ${chemical}`);
    if (outputQuantity > quantity) {
      if (!currentInventory[chemical]) {
        currentInventory[chemical] = 0;
      }
      currentInventory[chemical] += outputQuantity - quantity;
      debugLog(`Current leftovers for ${chemical} = ${currentInventory[chemical]}`);
    }
    if (outputQuantity < quantity) {
      let bumpedQuantity = outputQuantity;
      if (currentInventory[chemical]) {
        const bumpFromInventory = Math.min(currentInventory[chemical], quantity - outputQuantity);
        currentInventory[chemical] -= bumpFromInventory;
        bumpedQuantity += bumpFromInventory;
        debugLog(`Adding leftovers for ${chemical} = ${bumpFromInventory}`);
      }
      if (bumpedQuantity < quantity) {
        debugLog(`Didn't make enough ${chemical}, making ${quantity - bumpedQuantity} more.`);
        createComponents(chemical, quantity - bumpedQuantity);
      }
    }
  }
  createComponents('FUEL', fuelQuantity);
  return oreRequired;
}

export function calculateFuelWithOre(reactionStrings: string[], amountOfOre: number): number {
  let highFuel = amountOfOre;
  let lowFuel = 0;
  let currentFuelGuess;
  let countingDown = false;
  while (true) {
    currentFuelGuess = Math.ceil((highFuel - lowFuel) / 2) + lowFuel;
    debugLog(`Guessing with ${currentFuelGuess} fuel created`);
    const neededOre = calculateOre(reactionStrings, currentFuelGuess);
    debugLog(`Needed Ore: ${neededOre}, low: ${lowFuel}, high: ${highFuel}`);
    if (neededOre === amountOfOre || (countingDown && neededOre < amountOfOre)) {
      break;
    }
    if (neededOre < amountOfOre) {
      lowFuel = currentFuelGuess;
    }
    if (neededOre > amountOfOre) {
      highFuel = currentFuelGuess;
    }
    if (highFuel === lowFuel + 1) {
      countingDown = true;
      highFuel = lowFuel;
      lowFuel = highFuel - 1;
    }
  }
  return currentFuelGuess;
}

function debugLog(message: string) {
  // tslint:disable-next-line: no-console
  console.debug(message);
}

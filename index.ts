// tslint:disable: no-console
import * as chalk from 'chalk';
import * as commander from 'commander';
import * as path from 'path';

commander
  .command('execute <day>')
  .version('2018.0.1')
  .description('Executes the solution logic for a given day in the advent of code (1-25).')
  .option('--half [half]', 'Which half of the day to excute, "first", "second", or "both"', 'both')
  .action(async (day, options) => {
    await execute(day, options.half)
  });

commander.parse(process.argv);

async function execute(day:number, half:string) {
  console.log('Inside execute', day, half)
  const inputFile = path.join(__dirname, 'inputs', `day_${day}_input.txt`);

  const Solution = await import(`./src/day-${day}/solution`);
  const solution = new Solution.default(inputFile);

  console.log(`Running day ${chalk.yellow(day)}:`);

  if (half === 'both' || half === 'first') {
    const firstHalfResults = JSON.stringify(await solution.executeFirstHalf(), null, 2);
    console.log(`\tFirst half: ${chalk.blue(firstHalfResults)}`);
  }

  if (half === 'both' || half === 'second') {
    const secondHalfResults = JSON.stringify(await solution.executeSecondHalf(), null, 2);
    console.log(`\tSecond half: ${chalk.blue(secondHalfResults)}`);
  }
}


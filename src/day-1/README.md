# Day One

First day of Avent of Code. I've been practicing a bit using the 2018 puzzles, but definitely looking forward to some new ones.

## The Tyranny of the Rocket Equation

The envied position of "Fuel Counter-Upper".

## Part 1

To break apart the puzzle, it will be taking a line from the input file, which will be a number, running it through the calculation and then adding it to a running total.

So, first bit is to create a function for handling the calculation given a number.

### Unit Tests

First thing is to create unit tests based on the example equations and results.

### Implementation

The calculation itself was pretty simple. Only catch was rounding out the division results so you didn't end up with a decimal number.

Next is to iterate through the file (using a utility I already created for parsing lines of a file), converting it to an number,
and adding it to a running total. I'll so this part in the `executeFirstHalf` function itself.
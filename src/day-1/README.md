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

## Part 2

Okay, so we've added a bit of recursiveness to the whole thing. I'm going to go ahead and implement a newer function that will use the older function recursively.

## Unit Tests

First, is the tests. The tests themselves should look very similar to the part 1 tests, in that we'll give a number and expect a result.

## Implementation

Pretty straightfoward to call the original method recursively. Only thing I originally don't like about it is calling the original method twice. May try refactoring that.

Yes, changing from a do..while to a while loop and calculating initial value first, kept me from having to call the method twice. I like that a bit better.

The solution `executeSecondHalf` method looked very similar to the first half implementation, just changing out the call to use the recursive function.
# Day 7 - Amplification Circuit

Mine goes up to 11.

## Initial thoughts

Looks like we're using the intcode again -- I'm starting to sense this might not be the last time we use it, too. Kind of fun to build off of old answers. Liking that little twist this year.

With the way we've set things up to take and return output with Day 5's intcode, this should be pretty straightforward. Most a matter of running through all the possibilities and re-running runProgram time and again.

## Unit Tests

We do have some examples programs, so probably good to use those for some test cases. I've pulled in Day 5's intcode into here, and will keep it separate this time. With the amplifier taking care of the multiple processing.

The first nice unit to have is to generate and array full of all possible permutations of the numbers. Then, we can use that.

Once getAllPermutations was in place, used the example programs as test data for the amplify function.

## Implementation

First had 360 responses to find all permutations, which was wrong, so fixed that.


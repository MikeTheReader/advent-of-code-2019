# Day 2 - 1202 Program Alarm

Gotta hate it when the ship computer bursts into flames.

So the list itself is the values and the operations. Interesting.

Initially, it feels like a natural fit to read the whole list into an array. There are steps the program, but it feels like the only function will need will take the entire list as input and return the modified list as output.

## Unit Tests

Time to write unit tests. Again, we have a nice set of data to test against, so we'll use that to write the tests.

## Implementation - First Half

Okay, so made initial implementation and it worked for all but the last test case. I wasn't clear that in-progress modifications to the values could cause the program to change. I initally put in a copy of the array to prevent that.

## Implementation - Second Half

This reuses the same logic, just hammering it iteratively. Should be able to just implement the solution without additional lower-level functions.

## Refactor

Refactored a bit here to make the file reading utility a bit more lightweight from the usage standpoint. Also modified to pull out the logic from `executeSecondHalf` to be a fully tested function within `intcode.ts`. Didn't have great examples for part 2 expected results so created those tests a bit backwards from the results.
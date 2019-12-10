# Day 10 - Monitoring Station

[Puzzle Description](https://adventofcode.com/2019/day/10)

Good thing the elves are watching out for asteroids.

Back to grids again.

Im guessing this: "This line of sight can be at any angle, not just lines aligned to the grid or diagonally." Is going to get me.

So slope is going to come into this.

# Part 1

## Unit Tests

Unit test data again, this time in the form of a map. Might as well start with ingesting the map into a data structure.

First, unit tests for the `findBestStation` function. There may be sub-functions to that, but for now, we'll start with tests.

## Implementation

Switched to implementing a class with ingestMap as it's constructor and a getCoordinates method. This allowed for an easier way to query the map for x,y coordinates in that order.

Next is to figure out the actual solution to the problem.
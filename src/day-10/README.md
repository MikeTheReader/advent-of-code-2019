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

## Implementation - Intermission

So, working through this problem, I've realized that I've created logic around a grid multiple times. I'm going to take a few and implement a good Grid class that allows easy modification and intuitive referencing of the X, Y coordinates. Be back in a bit.

# Part 2

Initial thoughts are determine which stations are visible during each rotation (since we already have the logic for that) and then take that map and determine the order that the asteroids would be destoryed. Remove those from the original map, and go again, keeping a counter as you go.

## Unit tests

Going to start unit tests by using the smaller maps with the incremental steps, since I think that's going tobe the challenge in this one (getting the correct order). Might make sense to just return an array of asteroids in order instead of a count.

## .... Time Passes

Got really good and stuck on this one, so eventually came to a whole different idea. Rather than using slope, I calculated the angle from the center for every point in the grid, then sorted that list based on angle and distance from the center. Iterating through that list then caused things to work. Mission accomplished.
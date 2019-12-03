# Day 3 - Crossed Wires

Next on the priority list: fuel management system installation.

# First Half

## General Problem Breakdown

First, we need to determine all points of intersection. The problem was presented as a grid, and likely that would be the best way to solve it. A grid translates to a two-dimensional array. In this case, we could initialize the array with 0s and then add one for each wire the enters that point in the array. Where the values of the array are greater than 1, we have an intersection.

That gives us:
1. ~Create the empty grid, initializing with 0s.~ (Scratch this -- looks like we won't know the size of the grid initially, so we'll just create a 2d array)
2. Parse the directions
3. Fill the grid based on the directions, incrementing each cell in the grid that the wire traverses
4. Determine which grid cells have a value greater than 1

Once we have the intersections, we iterate through them all, calculating manhattan distance (x1 - x2) + (y1 - y2) from the origin point.

## Unit tests

We have two solid unit tests based on the data, but we'll also want more granular ones based on our problem breakdown.

## Implementation

First problem -- what is the size of the grid? Looks like we will have to size it as we go, so not really initialize it. Luckily, Javascript makes that pretty easy.

Feels like we could use a class for the grid, since we will iteratively be adding wires to it.

Since we don't really need a visual and don't care about those entries that don't have values, modified to use nested objects and the keys of those to be the x,y coordinates. Makes it easier to say grid[x][y].

Realized the solution of incrementing a number doesn't actually help, since we can have a self-overlapping wire that we don't want to count as an intersection. Added a test for self-overlapping and implemented a fix by using Set as the value for a given x, y coordinate and then adding the wire number to it.

## Second Half

Second half seemed like it was going to be easy, but went through a couple of iterations. Managed to find a way of doing it that ended up cleaning up the logic for the first half.

Ended up:
* Changing from using a 2d array to using an object. Seemed a bit cleaner and iterating through it was faster.
* Moved away from the Set, since I was adding a `{ wire: 1, step: 2 }` type object in each cell. Since the step incremented each time, the Set would just keep adding the objects.
* Realized that it was easier to "gate check" the incoming steps rather than filter all the intersections after the fact.

Had it working and unit tests passing, but kept getting the wrong number for the final answer.

Turned out, I wasn't incrementing my step count if the wire went over the same point twice. The examples didn't intersect with themselves so those tests still worked. Corrected that and everything was much better.

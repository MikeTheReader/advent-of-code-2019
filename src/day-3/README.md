# Day 3 - Crossed Wires

Next on the priority list: fuel management system installation.

# First Half

## General Problem Breakdown

First, we need to determine all points of intersection. The problem was presented as a grid, and likely that would be the best way to solve it. A grid translates to a two-dimensional array. In this case, we could initialize the array with 0s and then add one for each wire the enters that point in the array. Where the values of the array are greater than 1, we have an intersection.

That gives us:
1. Create the empty grid, initializing with 0s
2. Parse the directions
3. Fill the grid based on the directions, incrementing each cell in the grid that the wire traverses
4. Determine which grid cells have a value greater than 1

Once we have the intersections, we iterate through them all, calculating manhattan distance (x1 - x2) + (y1 - y2) from the origin point.

## Unit tests

We have two solid unit tests based on the data, but we'll also want more granular ones based on our problem breakdown.

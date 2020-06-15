# Day 15 - Oxygen System

Houston, we have a problem.

Can't say I've ever code any maze-solving algorithms, so this will be new territory.

Interesting part to this one, too, is that there really isn't any test cases to work from. Can't say I want to go through the effort of creating an intcode program that would give me desired results.

Should be fun.

## ...6 months later

Obviously, I took a break from these challenges, but part of that was due to the fact that this one really exposes my own lack of ability with complex algorithms. Also, I struggled with this one as far as testing, because to do so well, I would need to recreate (or mock) the intcode results that would create a maze. A tough thing to do while also not being confident in my approach to the solution.

So, for this one, I scrapped the test and went towards a visualization aspect to give me more immediate feedback into what my algorithm was seeing and/or doing.

The original attempt I've made as far as running the maze was to always keep my virtual hand on one wall (in this case the left wall). The code checks for the presence of a wall to the left. If it finds one , it continues on in the direction its heading. If it doesn't find one it turns left. If in going forward, it hits a wall, it turns right. (Turning left in this situation would cause it to eventually get stuck going back and forth in a "hallway".)

So, with my first commit for this day, I have code that runs the entire maze (using the Day 11 version of IntCode). It finds the oxygen system and marks it and then finishes running the full maze. The next step is to figure out how to take that information and find the optimal path between the starting point and the oxygen system. (Again, where my abscence of a history in algorithms leaves me a bit wanting.) Off to google!

Solving. Okay -- there were a couple ways to think about it. The one I like it almost a brute force recursive function, one that takes ever possible path until it hits the goal. The one that comes back with the lowest number of steps wins. This should be fun to visualize. :)

Each case in the recursive function will find all possible exits from the given point (except for the one that it came from), and then launch itself for each direction it can go. When it reaches the goal, that will be its base case and it will return the number of steps it took to get to the goal. Compare those and find the best. If the direction we came from is the only exit, we can return -1 for a dead end.

# Part Two

So, in this part, we'll want to draw the entire grid -- something like what we did in the early stages of part 1. Draw the grid, once it's complete, then start doing the oxygen propogation thing, and use the grid component to figure out when all the "hallways" are full of oxygen. Mark all the hallways one way as we're drawing the maze. Start the propogation, changing those squares that are adjacent to a different mark. Iterate. Once all the initial marks are changed to the new marks, spit out the number of iterations.
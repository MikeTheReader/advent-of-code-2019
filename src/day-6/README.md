# Day 6 - Universal Orbit Map

Planetary motion in a linked list looks like.

# First half

Basic game plan is to link everything together and then descend the list, counting the connections.

## Unit tests

We have a good, almost more functional, test laid out. We'll also want to break it down a bit more.

Start with a galaxy object that has an add orbit function. The orbits we have would have links to their parents and children, thereby making is easier to traverse the list from the root.

The galaxy would hold on to the individual orbits, but the individual orbits would also know about their neighbors.
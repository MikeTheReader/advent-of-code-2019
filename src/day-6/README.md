# Day 6 - Universal Orbit Map

Planetary motion in a linked list looks like.

# First half

Basic game plan is to link everything together and then descend the list, counting the connections.

## Unit tests

We have a good, almost more functional, test laid out. We'll also want to break it down a bit more.

Start with a galaxy object that has an add orbit function. The orbits we have would have links to their parents and children, thereby making is easier to traverse the list from the root.

The galaxy would hold on to the individual orbits, but the individual orbits would also know about their neighbors.

## Implementation

Basically a linked list, though I referenced the objects in a map rather than an array to make it easier to retrieve them by name.

# Second half

Need to traverse the list a little differently and count the steps. This time, we'll need to find a common ancestor to the two planets.

## Unit tests

Was able to use the example data to create a pretty good unit test for the `findDistance` function.

## Implementation

* Trace back and get all "parent" planets for each of the two planets.
* Find the first common planet between them.
* Count the steps from YOU to the common and planet and add them to the steps from SAN to the common planet.
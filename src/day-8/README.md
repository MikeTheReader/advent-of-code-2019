# Day 8 - Space Image Format

Pictures of passwords? Seems unsecure.

# Part 1

Looks like this could be simpler than explained. Don't really see yet why I need to care about pixel arrangement, other than the layers, so simply dividing up the number should be enough at this point. So, for a 3 x 2, break the numbers up into groups of 6 and you have your layers.

We will need to count occurences, so that's the first function I'll tackle.

## Unit tests

Created unit tests for countOccurences.

Create unit tests for breakUpLayers, based on example data.

## Implementation

Pretty quick countOccurences.
# Day 8 - Space Image Format

Pictures of passwords? Seems unsecure.

# Part 1

Looks like this could be simpler than explained. Don't really see yet why I need to care about pixel arrangement, other than the layers, so simply dividing up the number should be enough at this point. So, for a 3 x 2, break the numbers up into groups of 6 and you have your layers.

We will need to count occurences, so that's the first function I'll tackle.

## Unit tests

Created unit tests for countOccurences.

Create unit tests for breakUpLayers, based on example data.

Last bit is calculating the checksum, so unit test for checksum.

## Implementation

Pretty quick countOccurences.

# Part 2

Again, it's looking like for most of it we don't really need the tight squares represented in the problem description. Lines of numbers will still have the same relative position. We just need to do something at the end so we can read the message (a nice twist to the end of the puzzle).

So the first thing is to take a set of layers and create a further visual layer from those (having only 1s and 2s).

We can then break that layer up by width and display it.

## Unit tests

So a mergeLayers is what we need now, so unit tests for that from the example data.
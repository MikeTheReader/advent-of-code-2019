# Day Four - Secure Container

Feeling like a hacker now -- breaking passwords.

## Part One

Initial look makes me thing we'll just be incrementing and then comparing numbers to determine if they match the rules. Should be pretty straight-forward (famous last words).

### Unit Tests

First, we'll start with a function that can determine if a number is a valid password outside of the range, since that will make use of the sample test cases.

### Implementation

Pretty straight-forward, only messed up in that I didn't set the previous value to compare unless it wasn't set at all. Once I fixed that, all was well. Added a couple more unit tests for that.

## Part Two

Part two adds criteria. I'm going to implement it as an additional function to keep the original unit tests and add new ones.

No surprises with this one, went pretty smooth.

## Refactor

A good deal of refactoring was done to break out the functions into consituent parts to have the exported functions be coordinator functions, and the non-exported functions contain the logic of individual criteria.



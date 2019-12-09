# Day 9 - Sensor Boost

Intcode again -- who'd a thunk it?

# First Half

Relative mode -- new mode. I figured there would be more opCodes coming, hadn't considered there was still room for more modes.

## Unit tests

Yay! Sample programs. Going to once again copy my intcode from day 7 and add to the tests.

## Implementation

Got stuck because I didn't realize that the new mode also applied to the write locations. Makes sense once I realize it, but didn't at first. Corrected and all is well.
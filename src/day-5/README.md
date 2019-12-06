# Day 5 - Sunny with a Chance of Asteroids

Thermal Environment Supervision Terminal (TEST).

# First Half

## Understanding

Interesting that we'll be re-using a previous puzzle's solution (at least a little bit).

New commands:
3: takes a single integer as input (from the user)
4: outputs a single integer

New parameter mode:
  __position__ (as it works now) or __immediate__ (just use the number)

Opcode is now changed to include parameter mode for each parameter:
  Example: 1002
  02 - command
  0 - paramater mode for first parameter
  1 = parameter mode for second parameter
  0 = parameter mode for third parameter (leading 0 so will only be set if it's a 1)

Program will take input (that's new).

Wow, this is not easy to understand. Nor are there really any tests cases provided. This will take a little looking at the puzzle input to fully understand it.

Looks like the opcode can be either a single digit (1, 2, 3, 4, or 99) or the more complex opcode shown above. (Though 99 will never usee the opcode since it doesn't have any parameters.)

May just let the system take an array of inputs, which in our case will be [1]. The 3 command can grab from there (instead of actual user input).

One change is that we no longer can count on 3 parameters for each command, so we can't just bump ahead 4 for each one.

## Unit tests

We should start with unit tests similar to those used in Day 2 in order to make sure we don't lose functionality. And we'll, initially, pull over the `runProgram` function from there, too.

What might be nice is to have something that parses the intcode (whether it's a single digit or the larger digit). That can return the command number, an array of parameter modes, and the number of spaces the command takes up (including the command itself -- so 2 for opcodes 3 and 4, and 4 for opcodes 1 and 2).

## Implementation

Opcode parser took longer than I thought. It might be that I'm brain-tired but removing the last two digits from a number seemed harder than it should have been. But, it works, so I'm going with it for now.

Next part is to add tests and implement the 3 and 4 commands.

Okay, that wasn't too tough. Had to move away from incrementing by 4 every time and just doing everything in a while loop until we hit 99. So now I've got the 3 and the 4 working and taking input and giving output.

Now, I need to add some unit tests for using the opcode in the series of commands and then implement that.

Got that going. Having the other function in place made that pretty quick and painless, other than I had my ternary expression backwards.

Woo hoo! Got the first part. Only trick was that I hadn't implmented immediate mode for opcode 4. Once that was in place, it was zeroes across the board and a diagnostic code.

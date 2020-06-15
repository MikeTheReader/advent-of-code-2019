# Day 16 - Flawed Frequency Transmission

I can tell why it's flawed -- it makes so little sense. Definitely going to have a spend a few mental cycles just understaind what is intended with this one.

So, we have two things:
* An input signal, which is a "list" of digits
* A pattern to apply, which is dependent on the position of the number

If you're dealing with the first digit in the list the pattern is:
```
1, 0, -1, 0, 1, 0, -1
```

If you're dealing with the second digit in the list the pattern is:
```
0, 1, 1, 0, 0, -1, -1, 0, 0, 1, 0, 0, -1, -1

So each new digit in the next phase will be calculated using the whole input sequence, with each digit multiplied by the pattern, added up and then taking the final digit of whatever than comes up with.

Okay, so in this case we have some good unit testable candidates.

Off to the tests!

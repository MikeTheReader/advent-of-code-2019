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
```

So each new digit in the next phase will be calculated using the whole input sequence, with each digit multiplied by the pattern, added up and then taking the final digit of whatever than comes up with.

Okay, so in this case we have some good unit testable candidates.

Off to the tests!

Okay, first half pretty straightfoward. Implemented.

## Second half

Okay, so confusion sets in once again.

![confusion](https://media.giphy.com/media/GmdFiZtdJtQty/giphy.gif)

So, the thing I wasn't getting before was that we'll have to take the input we get and repeat it 10,000 times. That's our new input.

Then, when we're done processing, we'll have a very large number. Use the first seven digits of the original input to find the offset of the eight-digit number we need to find.

Make perfect sense.


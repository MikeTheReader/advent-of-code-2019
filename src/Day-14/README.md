# Day 14 - Space Stoichiometry

Always sucks to run out of gas -- especially in the loneliness of space. Guessing there's no AAA out there.

The first part of this is parsing the reactions out to a data structure. The simplest one I can think of looks like an array of:

```javascript
{
  inputs: [
    {
      chemical: 'ORE',
      quantity: 10
    },
    {
      chemical: 'A',
      quantity: 5
    }
  ],
  outputs: [
    {
      chemical: 'AB',
      quantity: 1
    },
    {
      chemical: 'CD',
      quantity: 5
    }
  ]
}
```

The only problem with this strcuture is that it hides the references to the chemicals. It seems like what we need is the ability to work backwards from FUEL, so we'll need to find the reaction that ends in FUEL and then get the inputs and find the reactions that procduce the inputs and so on.

Looking again at the same data, there are no reactions that produce multiple outputs. So, we could do a data structure like this:

```javascript
{
  FUEL: {
    inputs: [
      {
        chemical: 'ORE',
        quantity: 10
      },
      {
        chemical: 'A',
        quantity: 5
      }
    ],
    outputQuantity: 10
  },
  A: {
    inputs: [
      {
        chemical: 'ORE',
        quantity: 5
      }
    ]
    outputQuantity: 5
  }
}
```
That way, we're able to quickly index based on the output and work backwards. (Updated to inclue output quantity.)
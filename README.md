# hull-ship-base

The base set of utilities to build Hull connectors - [ships](https://www.hull.io/docs/apps/ships/).

It provides loosly coupled modules and functions which can be plugged one by one.
On top of that it comes with higher level utilities providing patterns in using the base modules.

# Get started

`npm i -S hull-ship-base`


# Context
```
{
  ship: ship data
  client: hull client
  [cache: shipCache object]
  [segments: array of segment object]
  [agent: optional set of hull api superset]
  [queue: a method to queue background jobs]
}

```

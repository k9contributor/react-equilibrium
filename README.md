# react-equilibrium

This tool provides an intuitive way to elegantly share state between multiple React components, while doing a fair job of pretending to support operator overloading in Javascript such that any time you touch an Equilibrium value with a simple equals sign (namesake) you will gain all of the logging and debugging benefits of having applied a much more cumbersome reducer pattern.

# Try It Out

```
$ npm install
$ npm start
```

Observe that both components read state.  If desired, examine the Developer Tools console and inspect the source code to understand the mechanism by which state is being communicated, kept, and responsibly tracked.
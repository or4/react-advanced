# Arrow Functions vs bind

## Conclusion: Arrow functions is shorter, but there are downsides

### Mockability

The initialization of arrow functions in class properties are transpiled into the constructor and not in the prototype. So, even if we mock our function in the instantiated object, the changes won’t be seen by other objects through prototype chaining.

### Inheritance

Arrow functions in class properties won’t be in the prototype and we can’t call them with super.

If class B inherit from class A, handleClick won’t be in the prototype and we can’t call super.handleClick (because handleClick is a member and not in prototype) from overrided arrow function handleClick.

### Performance and memory

Arrow functions in class properties are much slower than bound functions, and both are much slower than usual function.

We know that usual functions are defined in the prototype and will be shared across all instances. If we have a list of N components, these components will share the same method. On the other hand, for the arrow functions in class properties, if we’re creating N components, these N components will also create N functions. Which means if we click on N components, N **different** functions will be called.

Benchmark:
Per 1 second ops
arrow functions - 3 million in 1 second
bound functions - 79 million in 1 second
function - 688 million in 1 second

**You only need to bind functions that you pass around. e.g. onClick={this.doSomething}. Or fetch.then(this.hanldeDone) — Dan Abramov‏**

### Source and links

[Good article and source of this](https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1)
# How can be collapsed `setState` method in class components

## The Main Conclusions

You can see a lot interesting things from the output, I write some of this.

To better understand you should see [code](https://github.com/or4/react-advanced/blob/master/src/set-state/collapse-in-class.tsx) and the output bellow.

* The synchronous `setState` calls and the calls that in `setState` callback are usually collapsed accordingly. If `setState` are called in `promise`, `setTimeout` or `setImmediate` they won't be collapsed and will be processed individually. For each `setState` that is called in `promise`, `setTimeout` or `setImmediate` the `render` method must be called each time.

* About prioritet: synchronous has primary prioritet, `setState` in callbacks has second prioritet. The next prioritet according to browser `event loop`, in the following order: `promise`, `setImmediate`, `setTimeout`.

* Synchronous `setState` calls or that are called in `setState` callbacks and promises are invoked consistently. `setState` that are invoked in `setTimeout` or `setImmediate` may be called inconsistently.

## About

I wrote [helper](https://github.com/or4/react-advanced/blob/master/src/set-state/collapse-in-class.tsx) that show how `setState` can be collapsed

In my tests this code was run once in methods
`componentWillMount`, `componentDidMount`, `componentWillReceiveProps`, `shouldComponentUpdate`, `componentWillUpdate`, `componentDidUpdate`, `render`

You can see full code [this](https://github.com/or4/react-advanced/blob/master/src/set-state/collapse-in-class.tsx)

Each of array is a value that received in __`render`__ function from special methods that I wrote above
Each of array is a invoke `render` function that received in __`render`__ function from special methods that I wrote above

This test run on the client side, it may be differ if run on the server side

## Problems

When you use `setState` it can collapsed, one of the case I show [here](https://github.com/or4/react-advanced/blob/master/src/set-state/collapse-in-class-cases.tsx)

## Output

```js
[
    "componentWillMount sync1",
    "componentWillMount sync2",
    "render sync1",
    "render sync2"
]
[
    "componentDidMount sync1",
    "componentDidMount sync2",
    "componentWillMount callback1",
    "componentWillMount callback2",
    "componentWillMount callback3",
    "componentWillMount callback4",
    "shouldComponentUpdate sync1",
    "shouldComponentUpdate sync2",
    "componentWillUpdate sync1",
    "componentWillUpdate sync2"
]
[
    "componentDidUpdate sync1",
    "componentDidUpdate sync2",
    "render callback1",
    "render callback2",
    "render callback3",
    "render callback4",
    "componentDidMount callback1",
    "componentDidMount callback2",
    "componentDidMount callback3",
    "componentDidMount callback4"
]
[
    "shouldComponentUpdate callback1",
    "shouldComponentUpdate callback2",
    "shouldComponentUpdate callback3",
    "shouldComponentUpdate callback4",
    "componentWillUpdate callback1",
    "componentWillUpdate callback2",
    "componentWillUpdate callback3",
    "componentWillUpdate callback4",
    "componentDidUpdate callback1",
    "componentDidUpdate callback2",
    "componentDidUpdate callback3",
    "componentDidUpdate callback4"
]
start UNSAFE_componentWillReceiveProps promise
[
    "componentWillReceiveProps_promise sync1",
    "componentWillReceiveProps_promise sync2"
]
[
    "componentWillReceiveProps_promise callback1",
    "componentWillReceiveProps_promise callback2",
    "componentWillReceiveProps_promise callback3",
    "componentWillReceiveProps_promise callback4"
]
["componentWillMount promise1"]
["componentWillMount promise2"]
["render promise1"]
["render promise2"]
["componentDidMount promise1"]
["componentDidMount promise2"]
["shouldComponentUpdate promise1"]
["shouldComponentUpdate promise2"]
["componentWillUpdate promise1"]
["componentWillUpdate promise2"]
["componentDidUpdate promise1"]
["componentDidUpdate promise2"]
["componentWillReceiveProps_promise promise1"]
["componentWillReceiveProps_promise promise2"]
start UNSAFE_componentWillReceiveProps setImmediate
[
    "componentWillReceiveProps_setImmediate sync1",
    "componentWillReceiveProps_setImmediate sync2"
]
[
    "componentWillReceiveProps_setImmediate callback1",
    "componentWillReceiveProps_setImmediate callback2",
    "componentWillReceiveProps_setImmediate callback3",
    "componentWillReceiveProps_setImmediate callback4"
]
["componentWillReceiveProps_setImmediate promise1"]
["componentWillReceiveProps_setImmediate promise2"]
["componentWillMount setImmediate1"]
["componentWillMount setImmediate2"]
["render setImmediate1"]
["render setImmediate2"]
["componentDidMount setImmediate1"]
["componentDidMount setImmediate2"]
["shouldComponentUpdate setImmediate1"]
["shouldComponentUpdate setImmediate2"]
["componentWillUpdate setImmediate1"]
["componentWillUpdate setImmediate2"]
["componentDidUpdate setImmediate1"]
["componentDidUpdate setImmediate2"]
["componentWillReceiveProps_promise setImmediate1"]
["componentWillReceiveProps_promise setImmediate2"]
start UNSAFE_componentWillReceiveProps setTimeout
[
    "componentWillReceiveProps_setTimeout sync1",
    "componentWillReceiveProps_setTimeout sync2"
]
[
    "componentWillReceiveProps_setTimeout callback1",
    "componentWillReceiveProps_setTimeout callback2",
    "componentWillReceiveProps_setTimeout callback3",
    "componentWillReceiveProps_setTimeout callback4"
]
["componentWillReceiveProps_setTimeout promise1"]
["componentWillReceiveProps_setTimeout promise2"]
["componentWillMount setTimeout1"]
["componentWillMount setTimeout2"]
["render setTimeout1"]
["render setTimeout2"]
["componentDidMount setTimeout1"]
["componentDidMount setTimeout2"]
["shouldComponentUpdate setTimeout1"]
["shouldComponentUpdate setTimeout2"]
["componentWillUpdate setTimeout1"]
["componentWillUpdate setTimeout2"]
["componentWillReceiveProps_setImmediate setImmediate1"]
["componentDidUpdate setTimeout1"]
["componentDidUpdate setTimeout2"]
["componentWillMount setTimeout3"]
["componentWillReceiveProps_setImmediate setImmediate2"]
["componentWillMount setTimeout4"]
["render setTimeout3"]
["render setTimeout4"]
["componentWillReceiveProps_promise setTimeout1"]
["componentWillReceiveProps_promise setTimeout2"]
["componentDidMount setTimeout3"]
["componentDidMount setTimeout4"]
["shouldComponentUpdate setTimeout3"]
["shouldComponentUpdate setTimeout4"]
["componentWillUpdate setTimeout3"]
["componentWillUpdate setTimeout4"]
["componentDidUpdate setTimeout3"]
["componentDidUpdate setTimeout4"]
["componentWillReceiveProps_promise setTimeout3"]
["componentWillReceiveProps_promise setTimeout4"]
["componentWillReceiveProps_setTimeout setImmediate1"]
["componentWillReceiveProps_setImmediate setTimeout1"]
["componentWillReceiveProps_setImmediate setTimeout2"]
["componentWillReceiveProps_setImmediate setTimeout3"]
["componentWillReceiveProps_setTimeout setImmediate2"]
["componentWillReceiveProps_setImmediate setTimeout4"]
["componentWillReceiveProps_setTimeout setTimeout1"]
["componentWillReceiveProps_setTimeout setTimeout2"]
["componentWillReceiveProps_setTimeout setTimeout3"]
["componentWillReceiveProps_setTimeout setTimeout4"]
```

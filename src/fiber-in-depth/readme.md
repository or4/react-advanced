# Fiber in depth

One of React’s core principles is consistency. React always updates the DOM in one go — it doesn’t show partial results. The workInProgress tree serves as a “draft” that’s not visible to the user, so that React can process all components first, and then flush their changes to the screen.

React processes updates very quickly and to achieve that level of performance it employs a few interesting techniques. **One of them is building a linear list of fiber nodes with effects for quick iteration.** Iterating the linear list is much faster than a tree, and there’s no need to spend time on nodes without side-effects.

## Links

[Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://indepth.dev/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/)

[The how and why on React’s usage of linked list in Fiber to walk the component’s tree](https://indepth.dev/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree/)

[React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture?source=post_page---------------------------)

## JSX

[Orig link](https://indepth.dev/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/)

This code is converted in that bellow code

```js
class ClickCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((state) => {
            return {count: state.count + 1};
        });
    }


    render() {
        return [
            <button key="1" onClick={this.handleClick}>Update counter</button>,
            <span key="2">{this.state.count}</span>
        ]
    }
}
```

And this code is converted in that bellow code

```js
class ClickCounter {
    ...
    render() {
        return [
            React.createElement(
                'button',
                {
                    key: '1',
                    onClick: this.onClick
                },
                'Update counter'
            ),
            React.createElement(
                'span',
                {
                    key: '2'
                },
                this.state.count
            )
        ]
    }
}
```

ReactDOM take something like that and convert to fiber tree

```js
[
    {
        $$typeof: Symbol(react.element),
        type: 'button',
        key: "1",
        props: {
            children: 'Update counter',
            onClick: () => { ... }
        }
    },
    {
        $$typeof: Symbol(react.element),
        type: 'span',
        key: "2",
        props: {
            children: 0
        }
    }
]
```

There are react elements tree and fiber tree.

Сonsidered that fiber node is a small piece of work.
"You can think of a fiber as a data structure that represents some work to do or, in other words, a unit of work. Fiber’s architecture also provides a convenient way to track, schedule, pause and abort the work."

React elements is immutable, but fiber nodes is mutable.

## Structure of fiber node tree

![Structure of fiber node tree](./structure-of-fiber-node-tree.png)

Host component is a DOM components. Host equals DOM.
There are exists a few fiber node tree. These are `current`, `workInProgress` and `finishedWork`.
Trees `current` and `workInProgress` connected by `alternate` fields.
Tree `workInProgress` transforms to `finishedWork`.

Side effects like lifecycle methods and other are encoded in the `effectTag` field.

Effects in Fiber basically define the work. For host components the work consists of adding, updating or removing elements. For class components effects are to update refs and call the componentDidMount and componentDidUpdate lifecycle methods. There are also other effects corresponding to other types of fibers.

### Effects list

Effects list is building a linear list of fiber nodes with effects for quick iteration.
https://indepth.dev/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree/

This list is a subset of the `finishedWork` tree and is linked using the `nextEffect` property instead of the `child` property used in the current and `workInProgress` trees. Because it is a linear list.

## Root of the fiber tree

You can get `current` tree from root container

```js
const { current } = document.querySelector('#root')._reactRootContainer._internalRoot;
```

The fiber tree starts with a special type of fiber node which is `HostRoot`. It acts as a parent for your topmost component.

Find the `HostRoot`:
```js
fiberRoot.current.stateNode === fiberRoot; // true
```

You can get node from a component instance like this:

```js
render() {
    console.log(this._reactInternalFiber);
}
```

## Fiber node structure

For `ClickCounter`:

```js
{
    stateNode: new ClickCounter,
    type: ClickCounter,
    alternate: null,
    key: null,
    updateQueue: null,
    memoizedState: {count: 0},
    pendingProps: {},
    memoizedProps: {},
    tag: 1,
    effectTag: 0,
    nextEffect: null
}
```

For `span`:

```js
{
    stateNode: new HTMLSpanElement,
    type: "span",
    alternate: null,
    key: "2",
    updateQueue: null,
    memoizedState: null,
    pendingProps: {children: 0},
    memoizedProps: {children: 0},
    tag: 5,
    effectTag: 0,
    nextEffect: null
}
```

## General algorithm

The result for `render phase` is a tree of fiber nodes marked with side-effects. The effects describe the work that needs to be done during the following `commit phase`.

The work during the first `render` phase can be performed asynchronously.

React can process one or more fiber nodes depending on the available time, then stop to stash the work done and yield to some event. It then continues from where it left off.

Sometimes though, __it may need to discard the work done and start from the top again.__

These pauses are made possible by the fact that the work performed during this phase doesn’t lead to any user-visible changes, like DOM updates.

In contrast, the following __commit phase is always synchronous.__ This is because the work performed during this stage leads to changes visible to the user, e.g. DOM updates.

### Lifecycle methods

### The list of lifecycles called when working through the first `render phase`

* [UNSAFE_]componentWillMount (deprecated)
* [UNSAFE_]componentWillReceiveProps (deprecated)
* getDerivedStateFromProps
* shouldComponentUpdate
* [UNSAFE_]componentWillUpdate (deprecated)
* render

### The list of lifecycle methods executed during the second `commit phase`

* getSnapshotBeforeUpdate
* componentDidMount
* componentDidUpdate
* componentWillUnmount

Because these methods execute in the `synchronous commit phase`, they may contain side effects and touch the DOM.

## Render phase

The reconciliation algorithm starts from the topmost `HostRoot` fiber node using the `renderRoot` function.
React will start from the top but quickly skip over the parents until it gets to the component that had its setState method called.

### Main steps of the work loop

```js
function workLoop(isYieldy) {
  if (!isYieldy) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  } else {...}
}
```

### Four main functions

There are 4 main functions that are used to traverse the tree and initiate or complete the work

* performUnitOfWork
* beginWork
* completeUnitOfWork
* completeWork

It works like in this gif
![4 main functions](./four-functions.gif)

Note that straight vertical connections denote `siblings`, whereas bent connections denote `children`.

Let’s start with the first two functions `performUnitOfWork` and `beginWork`:

The function beginWork always returns a pointer to the next child to process in the loop or null.

```js
function performUnitOfWork(workInProgress) {
    let next = beginWork(workInProgress);
    if (next === null) {
        next = completeUnitOfWork(workInProgress);
    }
    return next;
}

function beginWork(workInProgress) {
    console.log('work performed for ' + workInProgress.name);
    return workInProgress.child;
}
```

If there’s a next child, it will be assigned to the variable `nextUnitOfWork` in the workLoop function. However, if there’s no child, React knows that it reached the end of the branch and so it can complete the current node. Once the node is completed, it’ll need to perform work for siblings and backtrack to the parent after that. This is done in the `completeUnitOfWork` function:

```js
function completeUnitOfWork(workInProgress) {
    while (true) {
        let returnFiber = workInProgress.return;
        let siblingFiber = workInProgress.sibling;

        nextUnitOfWork = completeWork(workInProgress);

        if (siblingFiber !== null) {
            // If there is a sibling, return it
            // to perform work for this sibling
            return siblingFiber;
        } else if (returnFiber !== null) {
            // If there's no more work in this returnFiber,
            // continue the loop to complete the parent.
            workInProgress = returnFiber;
            continue;
        } else {
            // We've reached the root.
            return null;
        }
    }
}

function completeWork(workInProgress) {
    console.log('work completed for ' + workInProgress.name);
    return null;
}
```

### Conclusion

As you can see from the implementation, both and `completeUnitOfWork` are used mostly for iteration purposes, whereas the main activities take place in the `beginWork` and `completeWork` functions.

## Commit phase

The phase begins with the function `completeRoot`. This is where React updates the DOM and calls pre and post mutation lifecycle methods.

When React gets to this phase, it has 2 trees and the effects list. The first tree represents the state currently rendered on the screen. Then there’s an alternate tree built during the render phase. It’s called `finishedWork` or `workInProgress` in the sources and represents the state that needs to be reflected on the screen.

### The main function that runs during the commit phase is commitRoot. Basically, it does the following:

* Calls the `getSnapshotBeforeUpdate` lifecycle method on nodes tagged with the `Snapshot` effect
* Calls the `componentWillUnmount` lifecycle method on nodes tagged with the `Deletion` effect
* Performs all the DOM `insertions`, `updates` and `deletions`
* Sets the `finishedWork` tree as `current`
* Calls `componentDidMount` lifecycle method on nodes tagged with the `Placement` effect
* Calls `componentDidUpdate` lifecycle method on nodes tagged with the `Update` effect

### Commit algorithm

1. After calling the pre-mutation method `getSnapshotBeforeUpdate`, React commits all the side-effects within a tree. It does it in two passes.

2. The first pass performs all DOM (host) insertions, updates, deletions and ref unmounts.

3. Then React assigns the `finishedWork` tree to the FiberRoot marking the `workInProgress` tree as the `current` tree. This is done after the first pass of the commit phase, so that the previous tree is still current during `componentWillUnmount`, but before the second pass, so that the `finished` work is `current` during `componentDidMount`/`Update`.

4. In the second pass React calls all other `lifecycle` methods and `ref` callbacks. These methods are executed as a separate pass so that all `placements`, `updates`, and `deletions` in the entire tree have already been invoked.

Here’s the gist of the function that runs the steps described above:

```js
function commitRoot(root, finishedWork) {
    commitBeforeMutationLifecycles()
    commitAllHostEffects();
    root.current = finishedWork;
    commitAllLifeCycles();
}
```

Each of those sub-functions implements a loop that iterates over the list of effects and checks the type of effects. When it finds the effect pertaining to the function’s purpose, it applies it.

### Pre-mutation lifecycle methods

Here is, for example, the code that iterates over an effects tree and checks if a node has the Snapshot effect:

```js
function commitBeforeMutationLifecycles() {
    while (nextEffect !== null) {
        const effectTag = nextEffect.effectTag;
        if (effectTag & Snapshot) {
            const current = nextEffect.alternate;
            commitBeforeMutationLifeCycles(current, nextEffect);
        }
        nextEffect = nextEffect.nextEffect;
    }
}
```

For a class component, this effect means calling the `getSnapshotBeforeUpdate` lifecycle method.

### DOM updates

`commitAllHostEffects` is the function where React performs DOM updates. The function basically defines the type of operation that needs to be done for a node and executes it:

```js
function commitAllHostEffects() {
    switch (primaryEffectTag) {
        case Placement: {
            commitPlacement(nextEffect);
            ...
        }
        case PlacementAndUpdate: {
            commitPlacement(nextEffect);
            commitWork(current, nextEffect);
            ...
        }
        case Update: {
            commitWork(current, nextEffect);
            ...
        }
        case Deletion: {
            commitDeletion(nextEffect);
            ...
        }
    }
}
```

It’s interesting that React calls the `componentWillUnmount` method as part of the deletion process in the `commitDeletion` function.

### Post-mutation lifecycle methods

`commitAllLifecycles` is the function where React calls all remaining lifecycle methods `componentDidUpdate` and `componentDidMount`.

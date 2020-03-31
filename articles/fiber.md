#



~~One of React’s core principles is consistency. React always updates the DOM in one go — it doesn’t show partial results. The workInProgress tree serves as a “draft” that’s not visible to the user, so that React can process all components first, and then flush their changes to the screen.~~

~~React processes updates very quickly and to achieve that level of performance it employs a few interesting techniques. **One of them is building a linear list of fiber nodes with effects for quick iteration.** Iterating the linear list is much faster than a tree, and there’s no need to spend time on nodes without side-effects.~~



### Links

[Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)

[The how and why on React’s usage of linked list in Fiber to walk the component’s tree](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)
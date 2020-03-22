# Explain change detection

## Difference between frameworks

### Scope

In Angular - Forms / HTTP / Router

In React all features like react-router are made in external repositories

### Render Mechanism

Change detection in angular / Reconcilation in react before 16 and Render in react after 16 version

### State Mechanism

Dependency Injection / hooks (context API)

## Downsides manually synchronization

* a lot of manual work
* good knowledget DOM API
* imperative style

## Phases of render

### Compilation

#### Angular - Ivy Compliler

First compilation is Ahead-Of-Time (AOT) compilation. Other compilations is Just-In-Time (JIT) (perform in runtime).

```js
<li [className]="rating > 0 ? 'outline' : 'solid'"></li>

if (initialization) {
    elementStart(1, "li", attrs);
    elementStyling();
    elementEnd();
} else if (changeDetection) {
    // set isDirty=true and set new value
    elementStylingMap(1, (rating > 0) ? "outline" : "solid");
    // if isDirty true it update DOM
    elementStylingApply(1);
}
```

#### React - JSX compiler

After prod build for code looks like that

```js
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return <div>text content</div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

We have transpiled code that looks like that

```js
(this.webpackJsonpapp = this.webpackJsonpapp || []).push([
    [0],
    [
        ,
        ,
        ,
        function(e, t, n) {
            e.exports = n(4);
        },
        function(e, t, n) {
            'use strict';
            n.r(t);
            var r = n(0),
                a = n.n(r),
                c = n(2);
            function o() {
                return a.a.createElement('div', null, 'text content');
            }
            n.n(c).a.render(a.a.createElement(o, null), document.getElementById('root'));
        },
    ],
    [[3, 1, 2]],
]);
```

After start app, we call React.createElement that return object like bellow
It's called react compiler. For code like that

```js
<li className={rating > 0 ? 'outline' : 'solid'}></li>
```

It was created fiber-node like that

```js
{
    $$typeof: Symbol(react.element),
    type: "li",
    props: {
        className: (rating > 0) ? 'outline' : 'solid'
    }
}
```

Difference between angular and react, angular generate runtime instructions (code), react generate object with props elements

### Runtime

#### Angular - Schedule

In angular schedule is automatic it happens after events and other actions / conditions.
Angular has zone.js. It notify angular when happens any async event. It intercept async events like UI events, network events, timing events and so on. Zone.js notifies angular application.

Automatic scheduling, very targeted synchronization process by nodes by Ivy compiler and static nature templates.
Angular only compares nodes defined compiler.

#### Angular - Render (Change detection)

This phase happens when call instructions like

```js
    elementStylingMap(1, (rating > 0) ? "outline" : "solid");
    elementStylingApply(1);
```

#### React - Schedule

In react this phase is manual. React start when setState is called.

#### React - Render (Reconciliation)

React creates fiber node for each node and each elemnt of structure (examples: context, portals..)
React skip nodes that is not changed. It marks nodes that need update.
React look up from parent to child, and if parent not chaged then child is not changed
But I see that if we change state in child, paremt render is not called.

Manually mechanism scheduling and not targeted synchronization process
React compare all nodes each using some heuristics (which are changes and skip if not changes)
But thanks to the fact that there are no static templates we can very dynamicly work with framework

this process is async and not modify DOM

#### React - Commit

This phase sync, and modify DOM.
Commit phase use effects, that store in linked list.
Methods of react life cycles is effects.

## Links

https://indepth.dev/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/
https://indepth.dev/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree/
https://indepth.dev/everything-you-need-to-know-about-change-detection-in-angular/

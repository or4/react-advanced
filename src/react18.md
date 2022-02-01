# What's New in React 18

I saw the Conf that was in December 2021 and make some notes.

## Automatic batching

In React 16 batching works for `useEffect`, but not working for promises

```js
useEffect(() => {
    setData('text');
    setInput('value');
}, []);
useEffect(() => {
    setInput2('value2')
}, []);
```

In example above all `setState` should be batching and react 16 should run only one render

```js
useEffect(() => {
    Promise.resolve().then(() => {
        setData('text');
        setInput('value');
    })
}, []);
```

The problem in React 16 that if you run `setState` in a promise, then for each `setState` will be called separate render.

In React 18 this problem was fixed and all `setState` in a promise are batching and it calls one render.

If you no need to batching you can call `flushSync`


## Suspense

[`Suspense`](https://reactjs.org/docs/concurrent-mode-reference.html#suspensecomponent) - this is new way to manage loading flag and data \

```js
// this is previous way
const { loading, user } = useUserApi();
if (loading) {
    return <Spinner />
}
return <User {...user} />
```

There are a couple of problems with the previous method. There is a problem with the design, now we have two different entities and we manage them in this component. Another problem is when we use user data in several different components then we have to manage the spinner component in each component.

```js
// this is new way
return (
    <Suspense fallback={Spinner}>
        <User />
    </Suspense>
)

const { user } = useUserApi();
return <User {...user} />

```

The new way is more declarative, and you don't have to think about the spinner. The spinner can be controlled in a separate component.

In the nearest future the new way should be supported in the special libraries like Apollo, React-Query.
The React team is currently working on simplifying the `Suspense` contract.

In React 16 `Suspense` only works with lazy loading of javascript packages.

## Suspense on the server

You can use `Suspense` on the server, if there is a delay between the user's request and getting the prepared data

The server generates a spinner code and sends it to the client, /
the server then prepares the data and /
when the data is prepared the server sends the prepared data to the client

## New APIs (concurrent features)

In [Concurrent Mode](https://reactjs.org/docs/concurrent-mode-intro.html), rendering is not blocking. It is interruptible. React can work on several state updates concurrently.

* [startTransition()](https://reactjs.org/docs/concurrent-mode-reference.html#usetransition)
* [useTransition()](https://reactjs.org/docs/concurrent-mode-reference.html#usetransition)
* [useDeferredValues()](https://reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)

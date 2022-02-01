# What's New in React 18

I saw the Conf that was in December 2021 and make some notes.

## Automatic batching

In React 16 batching works for useEffect, but not working for promises

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

Suspense - this is new way to manage loading flag and data

```js
// this is previous way
const {loading, user} = useUserApi();
if (loading) {
    return <Spinner />
}
return <User {...user} />
```

In previous way there are a few problems for example when should show spinner in a few components, for example to show avatar and to show user details.

```js
// this is new way
return (
    <Suspense fallback={Spinner}>
        <User />
    </Suspense>
)
```

New way can be reached by special libraries like Apollo, React-Query. Sometimes it convenient for complex cases like bellow.
Because `pageId` can be changed before data is received.

```js
const useGetData = (pageId) => {
    const {loading, data} = usePageApi(pageId);
    if (loading) {
        return <Spinner />
    }
    return <Page {...data} />
}
```

Now React team are working on simplify contract with `Suspense`

In React 16 Suspense works only with lazy loading javascript bundles

## Suspense on the server

The main idea - if there is a delay between the user's request and getting the prepared data you can use Suspense on the server

Server generate spinner code and send it to the client, /
then server is preparing the data and /
when the data is prepared the server sends the prepared data to the client

# What's New in React 17

[React v17.0 official documentation](https://ru.reactjs.org/blog/2020/10/20/react-v17.html)

## No New Features

There are no new features \
This release is primarily focused on making it easier to upgrade React itself. \

In particular, React 17 is a «stepping stone» release that makes it safer to embed a tree managed by one version of React inside a tree managed by a different version of React.

## Gradual Upgrades

You can migrate app gradually. For example you can migrate the main app to react 18 and keep some subroute on React 17.

## Changes to Event Delegation

In React 17, React will no longer attach event handlers at the `document` level under the hood. Instead, it will attach them to the root DOM container into which your React tree is rendered.

In React 16 and earlier, React would do document.addEventListener() for most events. React 17 will call rootNode.addEventListener() under the hood instead.

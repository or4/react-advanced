# Where I should use setState

## List of lifecycle methods

You can and should use `this.setState()` in only these React lifecycle methods:

* `componentDidMount`
* `componentDidUpdate`
* `componentWillReceiveProps`

You can also set it in the `componentWillMount` method, but it’s recommend to use the `constructor` instead.

[where you can use setState](https://github.com/or4/react-advanced/blob/master/src/set-state/where-I-can-use-img.png)

[Source](https://levelup.gitconnected.com/react-cheatsheet-this-setstate-8bc12c5f40f5)

## Explanation

This list of lifecycle methods is due to the fact that methods like `componentWillMount` `componentWillUpdate` `shouldComponentUpdate`  `render` is async methods. And this methods participate in first phase of render - reconcilation. When you place `setState` in it `react` cannot effectively work with it. But methods `componentDidMount`, `componentDidUpdate`, `componentWillReceiveProps` are synchronous. And when you place `setState` in it, it looks transparently for `react`.

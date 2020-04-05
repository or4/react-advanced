# Where I should use setState

You can and should use `this.setState()` in only these React lifecycle methods: `componentDidMount`, `componentDidUpdate` and `componentWillReceiveProps`.
You can also set it in the `componentWillMount` method, but it’s recommend to use the constructor instead.

[where you can use setState](https://github.com/or4/react-advanced/blob/master/src/set-state/where-I-can-use-img.png)

[Source](https://levelup.gitconnected.com/react-cheatsheet-this-setstate-8bc12c5f40f5)

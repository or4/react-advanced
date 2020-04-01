# Вопросы на засыпку

## Почему setState нужно класть в методы

** getSnapshotBeforeUpdate
* componentDidMount
* componentDidUpdate
* componentWillUnmount

а не в методы

* [UNSAFE_]componentWillMount (deprecated)
* [UNSAFE_]componentWillReceiveProps (deprecated)
* getDerivedStateFromProps
* shouldComponentUpdate
* [UNSAFE_]componentWillUpdate (deprecated)
* render

Because these methods execute in the synchronous commit phase, they may contain side effects and touch the DOM.

## UNSAFE_ это действительно UNSAFE методы



import * as React from 'react';
import ReactDOM from 'react-dom';

interface IState {
    count: number;
}

class ClickCounter extends React.Component<{}, IState> {
    public constructor(props: {}) {
        super(props);
        this.state = { count: 0 };
        this.handleClick = this.handleClick.bind(this);
    }

    public componentDidMount() {
        // @ts-ignore
        console.log('el', document.getElementById('root')._reactRootContainer._internalRoot);
    }

    public handleClick() {
        this.setState(state => {
            return { count: state.count + 1 };
        });

        // @ts-ignore
        console.log('el', document.getElementById('root')._reactRootContainer._internalRoot);
    }

    public render() {
        // return [
        //     <button key="1" onClick={this.handleClick}>
        //         Update counter
        //     </button>,
        //     <span key="2">{this.state.count}</span>,
        // ];

        // @ts-ignore
        console.log('compInstance._reactInternalFiber', this._reactInternalFiber);

        return [
            React.createElement(
                'button',
                {
                    key: '1',
                    id: 'testId',
                    onClick: this.handleClick,
                },
                'Update counter'
            ),
            React.createElement(
                'span',
                {
                    key: '2',
                },
                'value of span ' + this.state.count
            ),
            React.createElement(
                'span',
                {
                    key: '3',
                },
                React.createElement('span', {}, 'sub span')
            ),
            React.createElement(
                'span',
                {
                    key: '4',
                },
                'span key 4 '
            ),
        ];

        // return {
        //     $$typeof: Symbol('react.element'),
        //     type: 'button',
        //     key: '1',
        //     props: {
        //         children: 'Update counter',
        //         onClick: this.handleClick,
        //     },
        //     ref: null,
        // };

        // {
        //     $$typeof: Symbol.for('react.element'),
        //     type: 'span',
        //     key: '2',
        //     props: {
        //         children: 0,
        //     },
        // },
        // ];
    }
}

// ReactDOM.render(<ClickCounter />, document.getElementById('root'));
// @ts-ignore
ReactDOM.render(React.createElement(ClickCounter, { valueX: 'testKey' }), document.getElementById('root'));
setTimeout(function() {
    // @ts-ignore
    window._reactRootContainer = document.getElementById('root')._reactRootContainer;
    // @ts-ignorec
    window._internalRoot = document.getElementById('root')._reactRootContainer._internalRoot;
    // @ts-ignore
    window.current = document.getElementById('root')._reactRootContainer._internalRoot.current;
    // @ts-ignore
    window.workInProgress = document.getElementById('root')._reactRootContainer._internalRoot.workInProgress;
}, 1000);
/*
tag: 1
key: null
elementType: class ClickCounter
type: class ClickCounter
stateNode: ClickCounter {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
return: FiberNode {tag: 3, key: null, elementType: null, type: null, stateNode: FiberRootNode, …}
child: FiberNode {tag: 5, key: "1", elementType: "button", type: "button", stateNode: button#testId, …}
sibling: null
index: 0
ref: null
pendingProps: {valueX: "testKey"}
memoizedProps: {valueX: "testKey"}
updateQueue: null
memoizedState: {count: 0}
dependencies: null
mode: 8
effectTag: 5
nextEffect: null
firstEffect: null
lastEffect: null
expirationTime: 0
childExpirationTime: 0
alternate: null
actualDuration: 6.729999993694946
actualStartTime: 370.2999999950407
selfBaseDuration: 2.40499999927124
treeBaseDuration: 2.7449999979580753
_debugID: 4
_debugIsCurrentlyTiming: false
_debugSource: null
_debugOwner: null
_debugNeedsRemount: false
_debugHookTypes: null
*/

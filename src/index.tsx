import * as React from 'react';
import ReactDOM from 'react-dom';

class ClickCounter extends React.Component<{}, { count: 0; res: string[] }> {
    private res: string[];
    private flagScu: boolean;
    private flagWU: boolean;
    private flagDU: boolean;
    private index: number;

    public constructor(props: {}) {
        super(props);
        this.state = { count: 0, res: [] };
        this.handleClick = this.handleClick.bind(this);
        console.log('ctor');
        this.res = [];
        this.flagScu = true;
        this.flagWU = true;
        this.flagDU = true;
        this.index = 0;
    }

    public UNSAFE_componentWillMount() {
        this.testSetState('componentWillMount');
    }

    public componentDidMount() {
        // console.log('el', document.getElementById('root')._reactRootContainer._internalRoot);

        this.testSetState('componentDidMount');
    }

    public shouldComponentUpdate() {
        if (this.flagScu) {
            this.flagScu = false;

            this.testSetState('shouldComponentUpdate');
        }

        return true;
    }

    public UNSAFE_componentWillUpdate() {
        if (this.flagWU) {
            this.flagWU = false;

            this.testSetState('componentWillUpdate');
        }
    }

    public componentDidUpdate() {
        if (this.flagDU) {
            this.flagDU = false;

            this.testSetState('componentDidUpdate');
        }
    }

    private testSetState = (prefix: string) => {
        this.pushToRes(`${prefix} sync1`, () => {
            this.pushToRes(`${prefix} cb1`);
            this.pushToRes(`${prefix} cb2`);
        });

        this.pushToRes(`${prefix} sync2`, () => {
            this.pushToRes(`${prefix} cb3`);
            this.pushToRes(`${prefix} cb4`);
        });

        Promise.resolve().then(() => {
            this.pushToRes(`${prefix} promise1`);
        });

        Promise.resolve().then(() => {
            this.pushToRes(`${prefix} promise2`);
        });

        setTimeout(() => {
            this.pushToRes(`${prefix} setTimeout1`);
        }, 0);
        setTimeout(() => {
            this.pushToRes(`${prefix} setTimeout2`);
        }, 0);

        setTimeout(() => {
            this.pushToRes(`${prefix} setTimeout3`);
        }, 10);
        setTimeout(() => {
            this.pushToRes(`${prefix} setTimeout4`);
        }, 10);

        setImmediate(() => {
            this.pushToRes(`${prefix} setImmediate1`);
        });
        setImmediate(() => {
            this.pushToRes(`${prefix} setImmediate2`);
        });
    };

    private pushToRes(value: string, cb?: () => void) {
        this.res.push(value);

        this.setState({ res: this.res }, cb);
    }

    public handleClick() {
        this.setState((state: any) => {
            return { count: state.count + 1 };
        });
    }

    public render() {
        console.log('render', this.state.res.slice(this.index));
        this.index = this.state.res.length;

        // if (this.flagScu) {
        //     this.flagScu = false;

        //     this.testSetState(     // }

        return [
            <button key="1" onClick={this.handleClick}>
                Update counter
            </button>,
            <span key="2">{this.state.count}</span>,
        ];
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

/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
    testProp: string;
}

interface IState {
    res: string[];
}

class SetStateTester extends React.Component<IProps, IState> {
    private res: string[];
    private flagScu: boolean;
    private flagWU: boolean;
    private flagDU: boolean;
    private flagRe: boolean;
    private flagWRP: number;
    private index: number;

    public constructor(props: IProps) {
        super(props);

        this.state = { res: [] };
        this.res = [];
        this.index = 0;

        // this flags need to run test code only once
        this.flagScu = true;
        this.flagWU = true;
        this.flagDU = true;
        this.flagRe = true;
        this.flagWRP = 3;
    }

    public UNSAFE_componentWillMount() {
        this.testSetState('componentWillMount');
    }

    public componentDidMount() {
        this.testSetState('componentDidMount');
    }

    public UNSAFE_componentWillReceiveProps(props: IProps) {
        console.log('start UNSAFE_componentWillReceiveProps', props.testProp);
        this.flagWRP > 0 && (this.flagWRP--, this.testSetState('componentWillReceiveProps_' + props.testProp));

        return true;
    }

    public shouldComponentUpdate() {
        this.flagScu && ((this.flagScu = false), this.testSetState('shouldComponentUpdate'));

        return true;
    }

    public UNSAFE_componentWillUpdate() {
        this.flagWU && ((this.flagWU = false), this.testSetState('componentWillUpdate'));
    }

    public componentDidUpdate() {
        this.flagDU && ((this.flagDU = false), this.testSetState('componentDidUpdate'));
    }

    public render() {
        this.flagRe && ((this.flagRe = false), this.testSetState('render'));

        console.log(this.state.res.slice(this.index));
        this.index = this.state.res.length;

        return null;
    }

    private testSetState = (prefix: string) => {
        this.pushToRes(`${prefix} sync1`, () => {
            this.pushToRes(`${prefix} callback1`);
            this.pushToRes(`${prefix} callback2`);
        });

        this.pushToRes(`${prefix} sync2`, () => {
            this.pushToRes(`${prefix} callback3`);
            this.pushToRes(`${prefix} callback4`);
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

    private pushToRes(value: string, callback?: () => void) {
        this.res.push(value);

        this.setState({ res: this.res }, callback);
    }
}

let flagApp = true;

const App = function() {
    const [testProp, setProp] = React.useState('init');

    if (flagApp) {
        flagApp = false;
        setProp('sync');

        Promise.resolve().then(() => {
            setProp('promise');
        });

        setImmediate(() => {
            setProp('setImmediate');
        });

        setTimeout(() => {
            setProp('setTimeout');
        });
    }

    return <SetStateTester testProp={testProp} />;
};

// @ts-ignore
ReactDOM.render(<App />, document.getElementById('root'));

/* eslint-disable @typescript-eslint/no-unused-expressions */

import * as React from 'react';
import ReactDOM from 'react-dom';

interface IProps {}

interface IState {
    counter: number;
}

class Case1Problem extends React.Component<IProps, IState> {
    public state = { counter: 0 };
    private flags: any = {};

    public componentDidMount() {
        if (!this.flags.dm) {
            this.flags.dm = true;

            this.setState({ counter: this.state.counter + 1 });
        }
    }

    public shouldComponentUpdate() {
        if (!this.flags.scu) {
            this.flags.scu = true;

            this.setState({ counter: this.state.counter + 1 });
        }
        return true;
    }

    public UNSAFE_componentWillUpdate() {
        if (!this.flags.wu) {
            this.flags.wu = true;

            this.setState({ counter: this.state.counter + 1 });
        }
    }

    public render() {
        return <div>{this.state.counter}</div>; // return 1
    }
}

class Case1Solve extends React.Component<IProps, IState> {
    public state = { counter: 0 };
    private flags: any = {};

    public componentDidMount() {
        console.log('componentDidMount');
        if (!this.flags.dm) {
            this.flags.dm = true;

            this.setState(state => {
                console.log('componentDidMount state', state);
                return { counter: state.counter + 1 };
            });
        }
    }

    public shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        if (!this.flags.scu) {
            this.flags.scu = true;

            this.setState(state => {
                console.log('shouldComponentUpdate state', state);
                return { counter: state.counter + 1 };
            });
        }
        return true;
    }

    public UNSAFE_componentWillUpdate() {
        console.log('UNSAFE_componentWillUpdate');
        if (!this.flags.wu) {
            this.flags.wu = true;

            this.setState(state => {
                console.log('UNSAFE_componentWillUpdate state', state);
                return { counter: state.counter + 1 };
            });
        }
    }

    public render() {
        return <div>{this.state.counter}</div>; // 3
    }
}

// @ts-ignore
ReactDOM.render(
    <>
        <Case1Problem />
        <Case1Solve />
    </>,
    document.getElementById('root')
);

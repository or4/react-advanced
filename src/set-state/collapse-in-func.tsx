/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
    testProp: string;
}

interface IState {
    res: string[];
}

function SetStateTester() {
    return <div>test</div>;
}

// @ts-ignore
ReactDOM.render(<SetStateTester />, document.getElementById('root'));

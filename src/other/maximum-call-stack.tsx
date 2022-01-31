import * as React from 'react';
import ReactDOM from 'react-dom';

let i = 1;

// @ts-ignore
function Test() {
    i % 100 === 0 && console.log('i', i);
    // since 3000 get error Uncaught RangeError: Maximum call stack size exceeded
    // after 7000 render freezes
    // if (i === 7000) {
    //     return null;
    // }

    if (i === 3000) {
        return null;
    }

    return (
        <>
            <div>{i++}</div>
            {Test()}
        </>
    );

    // return (
    //     <>
    //         {i++}
    //         <div key={i}>{Test()}</div>
    //     </>
    // );
}

ReactDOM.render(<Test />, document.getElementById('root'));

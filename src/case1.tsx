// Whether the parent render is called when the child state changes
// Result: parent render is not called

import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';

function App() {
    console.log('render App');

    return <ChildComponent />;
}

function ChildComponent() {
    console.log('render ChildComponent');
    const [ratio, setRatio] = React.useState(1);

    return (
        <>
            <div>{ratio}</div>
            <button onClick={() => setRatio(ratio + 1)}>click</button>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

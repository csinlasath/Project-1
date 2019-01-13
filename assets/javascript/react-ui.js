const test = React.createElement(
    'h1', 
    { id: 'main-title', className: "main-subject"},
    'This is Test 1'
);

const testTwo = React.createElement(
    'p',
    null,
    'This is test 2'
);

const header = React.createElement(
    'header',
    null,
    test,
    testTwo
);

ReactDOM.render(
    header,
    document.getElementById('root')
);

console.log(header);
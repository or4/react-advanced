const performance = require('perf_hooks').performance;

var array = [];
var object = {};

function testArray(len) {
    const start = performance.now();
    array = new Array(len);
    for (var i = 0; i < len; i++) {
        array[i] = i % 11;
    }
    for (var i = 0; i < len; i++) {
        array[i] = array[i] + (i % 7);
    }
    console.log('testArray', round(performance.now() - start));
}

function testUint8Array(len) {
    const start = performance.now();
    array = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        array[i] = i % 11;
    }
    for (var i = 0; i < len; i++) {
        array[i] = array[i] + (i % 7);
    }
    console.log('testUint8Array', round(performance.now() - start));
}

function testObject(len) {
    const start = performance.now();
    object = {};
    for (var i = 0; i < len; i++) {
        object[i] = i % 11;
    }
    for (var i = 0; i < len; i++) {
        object[i] = object[i] + (i % 7);
    }
    console.log('testObject', round(performance.now() - start));
}

testArray(10000);
testUint8Array(10000);
testObject(10000);

console.log('');
testArray(1000000);
testUint8Array(1000000);
testObject(1000000);

console.log('');

testArray(10000000);
testUint8Array(10000000);
testObject(10000000);


function round(value) {
    return ((value * 10000) >> 0) / 10000;
}

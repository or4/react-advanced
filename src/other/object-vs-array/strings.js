const performance = require('perf_hooks').performance;

var array = [];
var object = {};

function testArray() {
    const start = performance.now();
    const len = 1000000;
    array = new Array(len);
    for (var i = 0; i < len; i++) {
        array[i] = `some test ${i} value`;
    }
    for (var i = 0; i < len; i++) {
        array[i] = array[i] + `some test ${i} value`;
    }
    console.log('testArray', round(performance.now() - start));
}

testArray();

function testObject() {
    const start = performance.now();
    const len = 1000000;
    object = {};
    for (var i = 0; i < len; i++) {
        object[i] = `some test ${i} value`;
    }
    for (var i = 0; i < len; i++) {
        object[i] = object[i] + `some test ${i} value`;
    }
    console.log('testObject', round(performance.now() - start));
}

testObject();

function round(value) {
    return ((value * 100) >> 0) / 100;
}

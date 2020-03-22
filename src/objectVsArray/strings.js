const performance = require('perf_hooks').performance;

var array = [];
var object = {};

function testArray() {
    const start = performance.now();
    const len = 100000;
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

function testObjectFrom0() {
    const start = performance.now();
    const len = 100000;
    object = {};
    for (var i = 0; i < len; i++) {
        object[i] = `some test ${i} value`;
    }
    for (var i = 0; i < len; i++) {
        object[i] = object[i] + `some test ${i} value`;
    }
    console.log('testObjectFrom0', round(performance.now() - start));
}

testObjectFrom0();

function testObjectFrom1() {
    const start = performance.now();
    const len = 100000;
    object = {};
    for (var i = 1; i <= len; i++) {
        object[i] = `some test ${i} value`;
    }
    for (var i = 0; i < len; i++) {
        object[i] = object[i] + `some test ${i} value`;
    }
    console.log('testObjectFrom1', round(performance.now() - start));
}

testObjectFrom1();

function round(value) {
    return ((value * 100) >> 0) / 100;
}

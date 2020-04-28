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

function testObjectFrom0(len) {
    const start = performance.now();
    object = {};
    for (var i = 0; i < len; i++) {
        object[i] = i % 11;
    }
    for (var i = 0; i < len; i++) {
        object[i] = object[i] + (i % 7);
    }
    console.log('testObjectFrom0', round(performance.now() - start));
}

function testObjectFrom1(len) {
    const start = performance.now();
    object = {};
    for (var i = 1; i <= len; i++) {
        object[i] = i % 11;
    }
    for (var i = 0; i < len; i++) {
        object[i] = object[i] + (i % 7);
    }
    console.log('testObjectFrom1', round(performance.now() - start));
}

testArray(100000);
testUint8Array(100000);
testObjectFrom0(100000);
testObjectFrom1(100000);
console.log('');
testArray(1000);
testUint8Array(1000);
testObjectFrom0(1000);
testObjectFrom1(1000);

function round(value) {
    return ((value * 10000) >> 0) / 10000;
}

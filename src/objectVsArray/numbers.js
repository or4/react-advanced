const performance = require('perf_hooks').performance;

var array = [];
var object = {};

function testArray() {
    const start = performance.now();
    const len = 100000;
    array = new Array(len);
    for (var i = 0; i < len; i++) {
        array[i] = i % 11;
    }
    for (var i = 0; i < len; i++) {
        array[i] = array[i] + (i % 7);
    }
    console.log('testArray', round(performance.now() - start));
}

testArray();

function testUint8Array() {
    const start = performance.now();
    const len = 100000;
    array = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        array[i] = i % 11;
    }
    for (var i = 0; i < len; i++) {
        array[i] = array[i] + (i % 7);
    }
    console.log('testUint8Array', round(performance.now() - start));
}

testUint8Array();

function testObjectFrom0() {
    const start = performance.now();
    const len = 100000;
    object = {};
    for (var i = 0; i < len; i++) {
        object[i] = i % 11;
    }
    for (var i = 0; i < len; i++) {
        object[i] = object[i] + (i % 7);
    }
    console.log('testObjectFrom0', round(performance.now() - start));
}

testObjectFrom0();

function testObjectFrom1() {
    const start = performance.now();
    const len = 100000;
    object = {};
    for (var i = 1; i <= len; i++) {
        object[i] = i % 11;
    }
    for (var i = 0; i < len; i++) {
        object[i] = object[i] + (i % 7);
    }
    console.log('testObjectFrom1', round(performance.now() - start));
}

testObjectFrom1();

function round(value) {
    return ((value * 100) >> 0) / 100;
}

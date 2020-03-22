## Store data in an Object or Array

### Arrays: constant time lookup, linear insertion and removal (e.g. unshift() and shift()).

### Objects: constant time lookup, contant insertion and retrieve

I see in a [report](https://www.youtube.com/watch?v=kl7a1LWXjtI) that objects created with 1 perfomance less than objects created with 0. But in tests I dont saw it.

```js
Results of tests in ms:

node src/objectVsArray/strings.js
    node 10.11.0
        testArray 46.98
        testObjectFrom0 45.01
        testObjectFrom1 46.41

    node 13.11.0
        testArray 53.63
        testObjectFrom0 44.57
        testObjectFrom1 43.25

node src/objectVsArray/numbers.js
    node 8.6.0
        testArray 4.59
        testUint8Array 2.82
        testObjectFrom0 5.14
        testObjectFrom1 5.75

    node 10.11.0
        testArray 4.05
        testUint8Array 2.39
        testObjectFrom0 5.9
        testObjectFrom1 6.27

    node 12.16.1
        testArray 5.46
        testUint8Array 3.69
        testObjectFrom0 7.44
        testObjectFrom1 7.24

    node 13.11.0
        testArray 5.37
        testUint8Array 3.84
        testObjectFrom0 7.69
        testObjectFrom1 7.74
```

### Links

[JS objects and arrays — Which one is faster](https://medium.com/@sherryhsu/js-objects-and-arrays-which-one-is-faster-cfcdb1281704)

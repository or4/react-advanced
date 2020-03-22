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

    node 10.11.0
        big array 10 000
            testArray 3.9829
            testUint8Array 2.4837
            testObjectFrom0 5.7762
            testObjectFrom1 5.8688

        small array 1000
            testArray 0.0109
            testUint8Array 0.0123
            testObjectFrom0 0.0516
            testObjectFrom1 0.0465

    node 13.11.0
        big array 10 000
            testArray 5.6402
            testUint8Array 3.4987
            testObjectFrom0 7.7125
            testObjectFrom1 7.1442

        small array 1000
            testArray 0.0811
            testUint8Array 0.0851
            testObjectFrom0 0.0931
            testObjectFrom1 0.082
```

**If you see perfomance better in small typed array**

### Links

[JS objects and arrays — Which one is faster](https://medium.com/@sherryhsu/js-objects-and-arrays-which-one-is-faster-cfcdb1281704)

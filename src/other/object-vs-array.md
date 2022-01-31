## Store data in an Object or Array

### Arrays: constant time lookup, linear insertion and removal (e.g. unshift() and shift()).
### Objects: constant time lookup, constant insertion and retrieve

### Test results for node 14.17.1

```bash
node ./object-vs-array/strings.js
```

Test for strings. It was insertion test to array and object


| Method     | Cycles           | Result                         |
|------------|------------------|--------------------------------|
| testArray  | 10000 items      | 7.86ms                         |
| testObject | 10000 items      | 7.05ms                         |
| testArray  | 1000 000 items   | 496ms                          |
| testObject | 1000 000 items   | 925ms                          |
| testArray  | 10 000 000 items | 8136ms                         |
| testObject | 10 000 000 items | throw error, Memory allocation |

```bash
node ./object-vs-array/numbers.js
```

Test for numbers. It was insertion test to array, Uint8Array and object


| Method          | Cycles           | Result                         |
|-----------------|------------------|--------------------------------|
| testArray       | 10000 items      | 2.4ms                          |
| testUint8Array  | 10000 items      | 2.1ms                          |
| testObject      | 10000 items      | 7.5ms                          |
| testArray       | 1000 000 items   | 12.8ms                         |
| testUint8Array  | 1000 000 items   | 7.4ms                          |
| testObject      | 1000 000 items   | 42ms                           |
| testArray       | 10 000 000 items | 107.4ms                        |
| testUint8Array  | 10 000 000 items | 62.3ms                         |
| testObject      | 10 000 000 items | 439ms                          |


**If you see perfomance better in small typed array**

### Links

[JS objects and arrays — Which one is faster](https://medium.com/@sherryhsu/js-objects-and-arrays-which-one-is-faster-cfcdb1281704)

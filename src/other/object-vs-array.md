## Object or Array

Arrays: constant time lookup, linear insertion and removal (e.g. unshift() and shift()).
Objects: constant time lookup, constant insertion and retrieve
**For a large number of elements it is better to use arrays**

### Test results for node 14.17.1

```bash
node ./object-vs-array/strings.js
```

Test for strings. It was insertion test to array and object


| Method     | Items      | Result                         |
|------------|------------|--------------------------------|
| testArray  | 10 000     | 7.86ms                         |
| testObject | 10 000     | 7.05ms                         |
| testArray  | 1 000 000  | 496ms                          |
| testObject | 1 000 000  | 925ms                          |
| testArray  | 10 000 000 | 8136ms                         |
| testObject | 10 000 000 | throw error, Memory allocation |

```bash
node ./object-vs-array/numbers.js
```

Test for numbers. It was insertion test to array, Uint8Array and object


| Method          | Items      | Result                         |
|-----------------|------------|--------------------------------|
| testArray       | 10 000     | 2.4ms                          |
| testUint8Array  | 10 000     | 2.1ms                          |
| testObject      | 10 000     | 7.5ms                          |
| testArray       | 1 000 000  | 12.8ms                         |
| testUint8Array  | 1 000 000  | 7.4ms                          |
| testObject      | 1 000 000  | 42ms                           |
| testArray       | 10 000 000 | 107.4ms                        |
| testUint8Array  | 10 000 000 | 62.3ms                         |
| testObject      | 10 000 000 | 439ms                          |


### Links

[JS objects and arrays — Which one is faster](https://medium.com/@sherryhsu/js-objects-and-arrays-which-one-is-faster-cfcdb1281704)

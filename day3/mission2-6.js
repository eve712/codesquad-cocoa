
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const reducer = (a, b) => a + b;

const myReduce = (arr, callback, initialValue) => {
    let accumulator = callback(initialValue, arr[0]);
    for(let i = 0; i < arr.length - 1; i++) {
        accumulator = callback(accumulator, arr[i + 1]);
    }    
    return accumulator;
}

let result = myReduce(arr, reducer, 10);
console.log(result);
console.log(arr.reduce(reducer, 10));  //같은 결과




//const result = myReduce(arr, (next, prev) => {...}, []);
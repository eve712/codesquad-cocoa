

const myReduce = (arr, callback, initialValue) => {
    let accumulator = callback(initialValue, arr[0]);
    for(let i = 0; i < arr.length - 1; i++) {
        accumulator = callback(accumulator, arr[i + 1]);
    }    
    return accumulator;
}

// test1
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const reducer = (a, b) => a + b;

let result = myReduce(arr, reducer, 10);
console.log(result);
console.log(arr.reduce(reducer, 10));  //같은 결과

// test2
const arr2 = [{x: 1}, {x: 2}, {x: 3}];
const reducer2 = (accumulator, currentValue) => {
    return accumulator + currentValue.x;
}
result = myReduce(arr2, reducer2, 0);
console.log(result);
console.log(arr2.reduce(reducer2, 0)); //같은 결과

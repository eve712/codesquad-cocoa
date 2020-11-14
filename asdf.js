let arr = [1, 2];
const arr2 = [3, 4];
const obj = {arr, arr2};
let ws = new WeakSet();

ws.add(arr);
ws.add(arr2);
ws.add(obj);

console.log(ws); 
// WeakSet { (2) [1, 2], (2) [3, 4], {arr: Array(2), ..}}
console.log(ws.has(arr), ws.has(arr2));
// true true

arr = null;

console.log(ws);
// WeakSet { (2) [1, 2], (2) [3, 4], {arr: Array(2), ..}}
console.log(ws.has(arr), ws.has(arr2));
// false true
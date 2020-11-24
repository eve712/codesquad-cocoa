# ✏️비동기(Asynchronous)

## 📌 예시 이해하기
<br>

### ✱1번
```javascript
function test() {      
    let result = null;      

    fetch('https://jsonplaceholder.typicode.com/todos/1')    
    .then(response => response.json())    
    .then(json => result = json)     

    return result;
}
test(); // null
```
서버와 통신(fetch)하는 일은 브라우저가 하는 일이니까 브라우저에게 보내고 다음 코드를 실행.<br>
그래서 result에 원래 담겨져있던 null 반환.
```javascript
function test() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')    
    .then(response => response.json())
    .then(json => console.log(json))
}
test(); // {userId: 1, id: 1, title: "deletus aut autem", completed: false}
```

<br>

### ✱2번
```javascript
const baseData = [1,2,3,4,5,6,100];

const asyncRun = (arr, fn) => {
   arr.forEach((v,i) => {
     setTimeout(() => {
       setTimeout(() => {
         console.log("cb 2");
         fn(i)
        },1000);
       console.log("cb 1");
     }, 1000);
   });
}

asyncRun(baseData, idx =>console.log(idx));
// 1초 뒤에 - "cb 1"이 7번 거의 동시에 가까운 시간에 찍히고,
// 1초 뒤에 - "cb 2" "idx"가 순서대로 찍힌다.
```
`forEach`의 반복 → `setTimeout cb(1)` → `setTimeout cb(2)` 이 순서대로 진행 <br>

1. `forEach`가 쫘르륵 돌면서 `setTimeout cb(1)`이 7번 실행된다.
2. `setTimeout cb(1)` 7개가 순서대로 <ins>**Web APIs**</ins>로 이동해 1초 타이머가 실행된다.
3. 1초가 지나면 `setTimeout`의 콜백함수들이 <ins>**Callback Queue**</ins>에 순서대로 쌓인다.
4. `setTimeout cb(1)`의 콜백함수를 보면, `setTimeout cb(2)`, `console.log("cb 1")`이렇게 두 가지가 있다.
5. 첫 번째 콜백함수인 `setTimeout cb(2)`는 <ins>**Call Stack**</ins>에 들어갔다가 브라우저가 하는 일이기 때문에  <ins>**Web APIs**</ins>로 이동해 타이머를 돌린다.
6. 두 번째 콜백함수인 `console.log`는 <ins>**Call Stack**</ins>에 들어가고 JS가 바로 실행한다. 그래서 1초 뒤에 `"cb 1"`이 쫘르륵 7번 실행되는 것!
7. <ins>**Web APIs**</ins>에는 `setTimeout cb(2)`가 타이머를 다 돌고 차례대로 <ins>**Callback Queue**</ins>에 들어간다.
8. `setTimeout cb(2)`의 콜백함수들인 `console.log("cb 2")`와 `fn(i)`가 하나씩 순서대로 <ins>**Call Stack**</ins>에 들어가 실행된다.

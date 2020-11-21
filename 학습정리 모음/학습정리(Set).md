
# ✏️Set
- 데이터 타입 중 하나로, **중복되는 값을 가지지 않는 값들의 리스트**.
- 배열을 조금 개선한 자료구조. 중복 없이 유일한 값을 저장할 때 사용.
- 객체 형태를 중복없이 저장하려고 할 때 유용. 
- 메모리 누수에 최적화된 자료구조.
- 이미 존재하는지 여부를 파악할 때 많이 사용한다.
- 객체에서는 key의 자료형이 string으로 강제 변환이 일어나지만, set은 **값의 자료형을 강제 변환하지 않는다.** 5와 "5"는 다른 값으로 인식한다.
- Set을 활용해 배열의 중복 원소를 제거할 수 있다.

<br>

## 📌 매개변수, 반환값
```javascript
// 구문
new Set( [iterable] );

const foo = new Set();
console.log(foo); // Set {}

const bar = new Set([1, 2, 3]);
console.log(bar)  // Set {1, 2, 3}
```
- 매개변수 : iterable객체. 매개변수를 명시하지 않거나 null을 전달하면 비어있는 상태.
- 반환값 : 새로운 Set 객체.

```javascript
const foo = new Set([1, 2, 2, 3, 3, 4, 4, 5, 5]);
console.log(foo);
// Set {1, 2, 3, 4, 5}
```
set을 만들 때 중복되는 값을 가진 iterable을 넘기면, Set이 알아서 중복되는 값들 중 맨 앞의 값만 남기고 무시한다.

<br>

```javascript
const answer = [...new Set(arr)];
```
❗️ Set을 활용해 **배열의 중복 원소를 제거**할 수 있다. (algorithm/pr68644.js)
  

<br>
<br>

## 📌 메서드, 속성
```javascript
// 생성
let mySet = new Set();
// 추가
mySet.add("eve");
// 존재여부 확인 (bool)
mySet.has("eve");
// 값의 개수d
mySet.size
// 삭제
mySet.delete("eve");
// 모든 요소 제거
mySet.clear();
// 순회(반복)
mySet.forEach(v => console.log(v));
```
일반 배열에서 forEach()와 Set의 forEach()는 약간의 차이가 있다. <br>
forEach(callback)의 인자인 콜백 함수는 세 가지 인자를 받는다. <br>
- 현재 요소
- 키(인덱스)
- 호출 배열 <br>
  

Set에서는 키(인덱스)가 없기 때문에 앞의 두 가지 인자가 같은 값을 가진다.
```javascript
const foo = new Set(['안녕', '하이', '샬롬']);

foo.forEach((value, key, set) => {
    console.log(value, key, set);
});

// 안녕 안녕 Set(3) {'안녕', '하이', '샬롬'}
// 하이 하이 Set(3) {'안녕', '하이', '샬롬'}
// 샬롬 샬롬 Set(3) {'안녕', '하이', '샬롬'}
```

<br>
<br>

## 📌 Set → 배열
spread operator(전개 연산자)를 사용해 set을 배열로 바꿀 수 있다.
```javascript
const foo = new Set(['애플', '삼성']);
const fooInArray = [...foo];

console.log(fooInArray); // ['애플', '삼성'];
```
```javascript
// 배열의 중복 원소 제거
const answer = [...new Set(arr)];
```

<br>
<br>

## 📌 WeakSet
위의 `Set`은 강한 `Set`(strong set)이라 불리기도 한다. `Set`이 객체를 가질 때에는 변수에 객체를 할당할 때와 같은 방법으로 참조하기 때문이다. `Set` 인스턴스가 존재하는 한, garbage collection되지 않는다.

<br>

```javascript
const foo = new Set();

let object = { name: "eve"};

foo.add(object);
console.log(foo.size); // 1
console.log(foo);      // Set(1) { {name: 'eve'} }

object = null;
console.log(foo);      // Set(1) { {name: 'eve'} }

object = [...foo];     // [{name: 'eve'}]
object = [...foo][0];  // {name: 'eve'}
```
위와 같이 `Set`이 객체를 참조하고 있기 때문에 {name: 'eve'} 객체는 사라지지 않는다. 

<br>

`Set`이 참조하고 있는 객체에 대한 다른 참조가 전부 사라졌을 때, `Set`의 참조도 없애고 싶을 때가 있을 수 있다. 이와 같은 경우에 `WeakSet`을 사용하면 된다.

`WeakSet`은 약한 객체 참조를 가진다. 즉, `WeakSet`이 참조하는 객체에 다른 참조가 없으면 garbage collection 된다. 또, `WeakSet`은 primitive types를 가질 수 없다. 


```javascript
// 생성
const foo = new WeakSet();

foo.add(10); // TypeError

let object = {name: 'eve'};
foo.add(object);
foo.has(object); // true

object = null;   // 객체에 대한 참조를 object에서 해제. 동시에 foo에서도 해제.
foo.has(object); // false
```
`WeakSet`에 primitive type인 number를 `add`하자 `TypeError`가 발생한다.<br>
`object = null;`을 하면 객체에 대한 참조를 `object`에서 해제되고, 동시에 `foo`에서도 객체에 대한 참조가 해제된다.

하지만, 객체에 대한 참조가 해제된다고 해서 값도 없어지는 것은 아니다. 아래의 예시를 봐보자.
```javascript
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
```
`arr = null;`이후에 `ws`는 그대로지만 `ws.has(arr)`은 `false`인 것을 볼 수 있다.

<br>

`WeakSet`을 정리하자면,
- 만약 어떤 객체를 `WeakSet`에 넣은 채로 객체가 null이 되거나 접근 불가능하면(garbage collection) `WeakSet`에서도 해당 객체가 존재하지 않는 것처럼 작용한다.(값 자체는 남아있다) 이런 점을 활용하기 위해 `WeakSet`을 사용한다.
- 객체가 아닌 값을 `add()`, `has()`, `delete()` 메서드들에 인자로 넘기면 `TypeError`가 발생함. (reference type만 가능)
- 반복할 수 없음(non-iterable). 즉, `forEach()` 사용 불가.
- `size`속성이 존재하지 않음. 메서드는 `Set`과 동일

<br>
<br>




---

### 참고 출처

<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set> <br>
<https://medium.com/@khwsc1/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-es6-set%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-9b7294dfba99> <br>
<https://velog.io/@max9106/JavaScript-Set>


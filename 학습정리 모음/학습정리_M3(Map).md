- 객체: 키가 있는 컬렉션을 저장
  
- 배열: 순서가 있는 컬렉션을 저장 <br>
  
    ➔ 두 자료구조만으로 부족해서 Map과 Set이 등장.

<br>
<br>

# ✏️Map
Map은 key가 있는 데이터를 저장한다는 점에서 객체와 유사. <br>
하지만 Map은 **key에 다양한 자료형**을 허용한다는 점에서 다름.

맵은 키로 객체도 허용한다! (NaN도 허용)

```javascript
let john = {name: "John"};

let visitsCountMap = new Map();  // 고객의 방문 횟수를 세본다고 가정
visitsCountMap.set(john, 123);   // john 객체를 맵의 키로 사용

alert(visitsCountMap.get(john)); // 123
```
<br>

## 📌 Map 메서드, 프로퍼티

 - `new Map()` 새로운 맵을 만듦

 - `map.set(key, value)` key,value 저장
 - `map.get(key)` key에 해당하는 값 반환. (key가 없으면 undefined반환)
 - `map.has(key)` key 존재 여부 bool값 반환
 - `map.delete(key)` key 삭제
 - `map.clear()` 맵 안의 모든 요소 제거
 - `map.size` 요소 개수 반환
  
```javascript
let map = new Map();

map.set('1', 'str1');   // 문자열 키
map.set(1, 'num1');     // 숫자 키
map.set(true, 'bool1'); // 불린 키

// 객체는 키를 문자열로 변환
// 맵은 키의 자료형 변환✕ (자료형 제약이 없음)
alert(map.get(1));   // 'num1'
alert(map.get('1')); // 'str1'
alert(map.size);  // 3
```
<br>

- map.set 체이닝! map.set을 호출할 때마다 맵 자신이 반환된다.
```javascript
map.set('name', 'eve')
    .set(1, 'num')
    .set(true, 'bool');
```
<br>

## 📌 Map 요소 반복 작업
- `map.keys()` 각 요소의 키를 모은 iterable객체 반환
  
- `map.values()` 각 요소의 값을 모은 iterable객체 반환
- `map.entries()` 요소의 \[키,값]을 한 쌍으로 하는 iterable객체 반환
  
```javascript
let recipeMap = new Map([
    ['cucumber', 500],
    ['tomato', 350],
    ['onion', 50]
]);

// 키(vegetable)를 순회
for (let vegetable of recipeMap.keys()) {
    alert(vegetable);  // cucumber, tomato, onion
}

// 값(amount)을 순회
for (let amount of recipeMap.values()) {
    alert(amount);    // 500, 350, 50
}

// [키, 값] 쌍을 순회
for (let entry of recipeMap) { // recipeMap.entries()와 동일
    alert(entry);     
}
```
<br>

- 배열 메서드 forEach 가능!
```javascript
// (키, 값) 쌍을 대상으로 함수 실행
recipeMap.forEach( (value, key, map) => {
    alert(`${key}: ${value}`);
});
```

<br>

## 📌 맵 생김새?
```javascript
let recipe = new Map();
recipe.set('tomato', 500);
recipe.set('onion', 50);

// console.log(recipe);
Map(2) { 'tomato' => 500, 'onion' => 50 }
```
```javascript
let recipe = new Map([
    ['tomato', 350],
    ['onion', 50]
]);

// console.log(recipe);
Map(2) { 'tomato' => 350, 'onion' => 50 }

// console.log( recipe.entries() );
[Map Entries] { [ 'tomato', 350 ], [ 'onion', 50 ] }
```

<br>

## 📌 그 외 메서드
- `Object.entries(obj)` 
  - 객체 → 배열 
  - 객체의 [key, value]쌍을 요소로 가지는 배열 반환
  - `new Map(Object.entries(obj));`하면 **객체 → 맵**
  
- `Object.fromEntries(obj)` 
  - 배열 → 객체
  - 배열의 [key, value]쌍인 요소를 객체로 바꿔 반환
  - `Object.fromEntries(map.entries());`하면 **맵 → 객체**

```javascript
let obj = {
    name: "John",
    age: 30
};

// obj 객체를 [key, value]쌍을 요소로 가지는 배열로 바꾼뒤 Map 생성
let map = new Map(Object.entries(obj));

alert( map.get('name') ); // John
```
```javascript
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

// map.entries() → 맵의 [키,값]을 요소로 가지는 iterable객체 반환
// Object.fromEntries는 인수로 iterable 객체를 받음
let obj = Object.fromEntries(map.entries());

// obj = { banana: 1, orange: 2, meat: 4 }
```
# ✏️Type
JavaScript는 원시 타입과 참조 타입이라는 두 가지 자료형을 제공하며 Object를 제외한 모든 것들은 Primitive한 성격을 갖고 있다.
- Primitive Type : 데이터의 **실제 값** 할당
- Reference Type : 데이터의 **위치 값** 할당

<br>

## 📌 Primitive Type
원시 타입의 데이터는 변수에 할당이 될 때 메모리 상에 고정된 크기로 저장이 되고, 해당 변수가 **원시 데이터 값**을 보관한다. 원시 타입 자료형은 모두 변수 선언, 초기화, 할당 시 값이 저장된 메모리 영역에 직접적으로 접근한다. 즉, 변수에 새 값이 할당될 경우, 변수에 할당된 메모리 블럭에 저장된 값을 바로 변경한다. Access by value

<br>

### ✱종류
- string
- number
- boolean
- null
- undefined

<br>

### ✱변수 복사
각 변수 간에 원시 데이터를 복사할 경우, **데이터의 값이 복사**된다.
```javascript
let x = 100;
let y = x;  

x = 99; 

console.log(y); // 100
```
console 찍기 전, `x`를 `99`로 바꾸었지만 이전의 값 `100`을 저장했기 때문에 `y` 값에는 변화가 없다.

<br>
<br>

## 📌 Reference Type
참조 타입의 데이터는 크기가 정해져 있지 않고, 변수에 할당이 될 때 **값이 직접 해당 변수에 저장될 수 없으며, 변수에는 데이터에 대한 참조만 저장**된다. 변수의 값이 저장된 **메모리의 주소값**만 저장한다. 변수의 값이 저장된 메모리 블럭의 주소를 가지고 있고 자바스크립트 엔진이 변수가 가지고 있는 **메모리 주소를 이용해서 변수의 값에 접근**한다. Access by reference

<br>

### ✱종류
- Object (array, object, function)

<br>

### ✱변수 복사
각 변수 간에 참조 타입 데이터를 복사할 경우, **데이터의 참조(주소)가 복사**된다.
```javascript
// ex1
let x = {count : 100};
let y = x;

x.count = 99;

console.log(y); // 99;
```
변수 `x`와 `y`는 동일한 참조를 담고 있다. 따라서 동일한 객체를 가리키게 된다.

```javascript
// ex2
let x = {count : 100};
let y = x;

x = 99;

console.log(y); // {count: 100}
```
❗️ 여기서 헷갈린 부분이 생겨 추가로 예시를 정리한다.<br>

ex1의 경우 `x.count`로 변수 `x`가 **참조하고 있는 객체**에 직접 접근해서 값을 변경했다. `y`도 같은 객체를 참조하고 있기 때문에 당연히 변한 값을 참조한다. <br>
ex2의 경우 `x` 변수를 다른 값으로 덮어썼다. 하지만 `y`는 `x`를 참조하고 있는 것이 아니라 `x`가 **참조했던 객체를 참조하는 것**이다. 따라서 변수 `y`는 여전히 그 객체를 참조한다!

<br>
<br>

## 📌 Primitive Type vs Reference Type
```javascript
let list1 = [1, 2, 3];  // 메모리주소: 8765e라고 가정
let list2 = [1, 2, 3];  // 메모리주소: 9524e라고 가정

let isSame = list1 === list2; // 8765e === 9524e

console.log(isSame); // false
```
`list1`, `list2` 안의 요소는 같지만 배열을 새롭게 만들어 변수에 담고 있기 때문에 **각자 새로운 메모리 위치를 만들어 저장**하고 그 위치를 참조하여 **변수에 해당 위치값을 저장**하는 것과 같다. 따라서 false가 된다.

<br>

```javascript
let list3 = [1, 2, 3];
let list4 = list3;  // list3의 위치값을 저장

let isSame = list3 === list4;

console.log(isSame); // true
```
위의 예제와는 다르게 새롭게 배열을 생성하지 않고 `list3`의 위치값을 그대로 `list4`에 넣는 것이기 때문에 위치값이 같은 경우라고 할 수 있다. 따라서 true가 된다.

<br>

```javascript
const updateAge = () => this.age++;

const son = {
    age: 3,
    growUp: updateAge
};
const daughter = {
    age: 7,
    growUp: updateAge
};
const mother = {
    age: 38,
    growUp: updateAge,
    children: [son, daughter]
};
const father = {
    age: 38,
    growUp: updateAge,
    children: [son, daughter]
};
//-----------------------------
if(father.growUp === son.growUp) {
    console.log('성장 가능');  // 성장 가능
}
if(father.children === mother.children) {
    console.log('부부')       // X
}
```
`updateAge`라는 변수의 데이터 값으로 함수의 위치값을 저장했다. object는 해당 데이터의 위치값을 저장하므로 `father.growUp`과 `son.growUp`의 값은 같은 값이 된다. 따라서 결과는 true로 console에 '성장 가능'이 출력된다.

<br>

`father.children`과 `mother.children`에는 똑같은 변수들이 담겨있지만 객체 내에서 배열을 새롭게 만들어 서로 다른 위치값을 새롭게 할당받았기 때문에 위치값이 다르게 된다. 따라서 결과는 false로 console에는 아무것도 찍히지 않게 된다.

<br>
<br>

---

### 참고 출처
<https://velog.io/@surim014/JavaScript-Primitive-Type-vs-Reference-Type>
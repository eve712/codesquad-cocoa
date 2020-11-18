# ✏️Prototype

## 📌 Prototype = Prototype Object + Prototype Link
1. Prototype property가 가리키는 `Prototype Object`
2. 자기 자신을 만들어낸 객체의 원형을 의미하는 `Prototype Link`
   
<br>

## 📌 Prototype Object(Prototype property)
프로토타입은 자기 자신을 생성하게 한 자신의 원형 객체이다. 원형 객체라는 프로토타입은 function A() 함수 객체 그 자체일까? 아니다!!

자바스크립트의 모든 객체는 생성과 동시에 자기자신이 생성될 당시의 정보를 취한 `Prototype Object`라는 새로운 객체를 Cloning해서 만들어낸다. `prototype`이 객체를 만들어내기 위한 원형이라면 이 `Prototype Object`는 **자기 자신의 분신이며 자신을 원형으로 만들어질 다른 객체가 참조할 프로토타입이 된다.** 즉 객체 자신을 이용할 다른 객체들이 프로토타입으로 사용할 객체가 Prototype Object인 것!

<br>

< 함수가 정의될 때 이루어지는 일들! >
1. 해당 함수에 Constructor(생성자) 자격 부여
2. 해당 함수의 Prototype Object 생성, 연결
   
함수를 정의하면 함수만 생성되는 것이 아니라 Prototype Object도 같이 생성된다. 그리고 생성된 함수는 `prototype`이라는 속성을 통해 `Prototype Object`에 접근할 수 있다. Prototype Object는 일반적인 객체와 같으며 기본적인 속성으로 `constructor`와 `__proto__`를 가지고 있다. 또한 Prototype Object는 일반적인 객체이므로 속성을 마음대로 추가/삭제할 수 있다.
```javascript
Person.prototype.eyes = 2;
Person.prototype.nose = 1;
// prototype 속성으로 Prototype Object에 접근해 속성을 추가했다.
``` 

<br>

## 📌 Prototype Link(`__proto__`)
```javascript
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

let kim = new Person();
let park = new Person();

console.log(kim);      // Person { }
console.log(kim.eyes); // 2
```
kim에는 eyes라는 속성이 없는데도 kim.eyes를 실행하면 2라는 값을 참조한다. Prototype Object에 존재하는 eyes 속성을 참조했기 때문이다. 이것이 가능한 이유는 kim이 가지고 있는 딱 하나의 속성 `__proto__`가 그것을 가능하게 해주기 때문이다.

`__proto__` 속성은 모든 객체가 빠짐없이 가지고 있는 속성으로 **객체가 생성될 때 조상이었던 함수의 Prototype Object를 가리킨다.** kim객체는 Person함수로부터 생성되었으니 Person 함수의 Prototype Object를 가리키고 있는 것!

kim객체가 eyes를 직접 가지고 있지 않기 때문에 eyes 속성을 찾을 때까지 상위 프로토타입을 탐색한다. 최상위인 Object의 Prototype Object까지 도달했는데도 못 찾았을 경우 undefined를 리턴한다. 이렇게 `__proto__`속성을 통해 상위 프로토타입과 연결되어 있는 형태를 프로토타입 체인(Chain)이라고 한다.

이런 프로토타입 체인 구조때문에 모든 객체는 Object의 자식이라고 불리고, Object Prototype Object에 있는 모든 속성을 사용할 수 있다. 예를 들면 toString함수가 있다.

모든 객체의 확장은 객체가 소유한 prototype Object를 통해 이루어지며 이 연결의 끝은 Object 객체의 prototype Object이다.

<br>
<br>

## 📌 예시로 이해하기

```javascript
function foo(value) {
    this.x = value;
}
let A = new foo('hello');
console.log(A.x); //hello
console.log(A.prototype.x) //syntax error
```
1. prototype 프로퍼티는 Constructor가 가지는 프로퍼티다. **prototype은 함수객체만 가지고 있는 속성!!** 
2. 여기서 A객체는 함수객체가 아니고, 함수객체를 통해 만들어진 단일 객체일 뿐이다. 즉, A는 prototype 프로퍼티를 가지고 있지 않기 때문에 A.prototype.x가 syntax error인 것이다.
3. foo.prototype.x는 맞지만 A.prototype.x는 에러!

<br>

```javascript
let A = function () {};
A.prototype.x = function() {
    console.log('hello');
};
let B = new A();
B.x(); 
    // hello
console.log(A.prototype);
    // x: f ()
    // constructor: f ()   → Prototype Object 기본 속성
    // __proto__: Object   → Prototype Object 기본 속성
```
1. A 함수의 prototype속성이 `A Prototype Object`에 접근해 x메서드를 추가했다.
2. B 객체는 단 하나의 속성 `__proto__`를 갖고 있고, 이 속성은 `A Prototype Object`에 접근해 x를 참조한다.
3. A.prototype으로 A Prototype Object를 보면, 기본 속성인 constructor(A함수), \__proto__을 가지고 있고, 추가한 x메서드도 가지고 있다. 
4. `__proto__`는 prototype link로 상위에서 물려받은 객체의 프로토타입에 대한 정보이다. A Prototype Object의 상위 객체는 Object이기 때문에 \__proto__ 속성값으로 Object가 있는것이다.
5. A함수가 비어있기 때문에 A Prototype Object의 constructor가 비어있다. A.prototype.x = function() {...}; 이렇게 한다고 해서 A Prototype Object의 constructor 속성이 채워지지는 않는다. constructor는 A함수가 생성되는 당시의 정보만을 가지고 있기 때문에 변경이 불가능하다. A.prototype.x는 A Prototype Object에 새로운 x메서드를 만들어서 B.x();가 실행이 된다. 
6. constructor의 내용은 변경이 불가(재할당X)하지만, 위의 경우처럼 A.prototype.x로 밖에서 메서드를 Prototype Object에 추가할 경우에는, A.prototype.x로 재정의할 수 있다! **즉, Prototype Object의 기본 속성인 constructor로 들어가는지, Prototype Object의 메서드로 새로 추가가 되는 것인지에 따라 재정의 가능여부가 다르다고 할 수 있다!**

<br>

만약에 constructor에 x메서드가 있고, 생성자 함수 밖에서 또 A.prototype.x를 쓴다면 어떻게 될까? 밑의 예시 참고!! 결과를 먼저  말하자면, B.x();는 constructor에 있는 x메서드를 실행한다. 

```javascript
let A = function () {
    this.x = function () {
        console.log('hello');
    };
};
A.prototype.x = function() {
    console.log('world');
};
let B = new A();

B.x(); //hello
console.log(A.prototype); // {x: f, constructor: f}
A.prototype.x(); // world
B.__proto__.x(); //world
```
1. A 생성자 함수에 있는 x메서드가 `A Prototype Object`의 constructor 속성값으로 들어가게 되고, 이는 A함수 밖에서 변경할 수 없다.(A가 생성될 당시의 정보만을 가지기 때문에 재할당 불가)
2. A.prototype.x();를 하게 되면 `A Prototype Object`에서 기본 속성인 constructor가 아닌 새로운 메서드로 추가된다. 
3. B.x();는 `A Prototype Object`의 `constructor`에 있는 메서드 x를 참조해서 hello를 출력하고, B.\__proto__.x();는 `__proto__`속성으로 `A Prototype Object`의 x메서드를 참조해 world를 출력한다.

<br>
<br>

# ✏️Class
- 클래스는 변수와 함수 중 연관있는 변수와 함수를 하나로 묶을 때 사용하는 문법.
- 객체 단위로 코드 그룹화, 코드 재사용을 위해 사용한다.
- 생성자 패턴의 메모리사용의 단점을 극복하기 위해서 prototype이라는 속성의 키워드를 사용해서 객체를 생성하는 것이 JS에서 객체를 생성하는 표준적인 방법이다.
- 표현법이 너무 번거롭기 때문에, ES 2015에서는 ES Classes라는 표준으로 Class 키워드를 만들어서 OOP처럼 클래스를 좀 더 직관적으로 사용할 수 있게 했다.

 <br>

- 객체의 기본 상태를 설정해주는 생성자 메서드 constructor()는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화할 수 있다.
- 일반적인 함수는 선언식을 사용할 경우 호이스팅이 되지만 클래스는 적용되지 않는다.
 즉, 클래스를 선언한 후에만 객체를 생성할 수 있다.
- Class는 사실 함수이기 때문에 선언식과 표현식(변수에 할당) 두 가지 방법으로 사용할 수 있다.
- 표현식 중 기명 클래스 표현식에서는 클래스 내부에서만 사용가능.
- class body {} 안에서는 strict mode(엄격한 문법 적용)
- 클래스의 메서드 사이에 쉼표를 넣지 않는다. 객체 리터럴과는 다르다! 쉼표 넣으면 문법 에러 발생.
```javascript
// 클래스 선언
class User {
    constructor(name) { this.name = name; }
    sayHi() { alert(this.name); }
}
console.log(typeof User); //function
```
**< class User {} 문법구조가 하는 일 >**
1. User라는 이름을 가진 함수를 만든다. 함수 본문은 생성자 메서드
   constructor에서 가져온다.
    생성자 메서드가 없으면 본문이 비워진 채로 함수가 만들어진다.
2. sayHi 같은 클래스 내에서 정의한 메서드를 User.prototype에 저장한다.
```javascript
// ●●<User>●●
// User 함수를 만들고 함수 본문은 constructor에서 가져옴
constructor(name) {
    this.name = name;
}

// ●●<User.prototype>●●
//클래스 내 메서드는 User.prototype에 저장
sayHi: function
constructor: User
```
   
new User를 호출해 객체를 만들고, 객체의 메서드를 호출하면 메서드를 프로토타입에서 가져온다. 이 과정이 있기 때문에 객체에서 클래스 메서드에 접근 가능하다.

정리하자면,
```javascript
class User {
    constructor(name) { this.name = name; }
    sayHi() { alert(this.name); }
}
// 클래스는 함수, 생성자 메서드와 동일
console.log(User === User.prototype.constructor); //true
// 클래스 내부에서 정의한 메서드는 User.prototype에 저장
console.log(User.prototype.sayHi) //alert(this.name);
// 현재 프로토타입에는 메서드가 두 개
console.log(Object.getOwnPropertyNames(User.prototype));
// constructor, sayHi
```

<br>

---

## 참고
class - https://ko.javascript.info/class

prototype 

 https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67

 http://insanehong.kr/post/javascript-prototype/
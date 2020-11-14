
# ✏️그 외 여러가지

## prototype
- prototype은 말 그대로 객체의 원형.
- 함수는 객체 → 생성자도 객체 → 객체는 property를 가질 수 있고, prototype이라는 property를 가진다. (생성자 함수의 프로퍼티로 prototype을 갖는다)
- prototype에 저장된 속성들은 생성자를 통해서 객체가 만들어질 때 그 객체에 연결된다.  
  
```javascript
function Ultra() {}
Ultra.prototype.ultraProp = true;

function Super() {}
var t = new Ultra();
t.ultraProp = 4;
Super.prototype = t;

function Sub() {}
Sub.prototype = new Super();

var o = new Sub();

console.log(o.ultraProp); // 4

//-------------------------------

function Ultra() {}
Ultra.prototype.ultraProp = true;

function Super() {}
Super.prototype = new Ultra();

function Sub() {}
Sub.prototype = new Super();

var o = new Sub();

console.log(o.ultraProp); // true

// o객체가 ultraProp 속성을 가지고 있지 않으면, 
// 그 객체의 생성자에 정의되어 있는 prototype 프로퍼티를 뒤져서 ultraProp 값이 있는지 없는지 확인하고 있으면 반환. 
// 그 속성을 찾을 때까지 prototype chain을 타고 올라간다.
```

- 생성자로 만든 객체는 prototype이라는 속성을 가짐 (클래스 간에 공유하는 속성)
- 생성자 안에 메서드를 만들면 비효율적 (클래스들이 공통으로 가지는 메서드를 객체마다 따로따로 가지면 똑같은 문장 중복으로 가독성, 유지보수, 메모리 상 비효율적)
- 클래스들이 공통으로 가지는 메서드를 prototype으로 묶어서 메서드를 생성
```javascript
function Human(name, hp, mp, power) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.power = power;
}
Human.prototype.attack = function(target) {
    target.hp -= this.power;
};
```

<br>

## 생성자(Constructor) 
- 비슷한 객체를 여러 개 만들 때는 객체를 만드는 함수인 생성자를 이용. 
- 생성자를 이용해서 객체를 만들 때는 new 키워드를 사용.(new를 붙임으로써 단순 함수가 아닌 객체를 생성하는 생성자가 된다.)
- **함수를 호출할 때 new를 붙이면 새로운 객체를 만든 후에 이를 return한다.**
- 생성자는 관례적으로 대문자로 시작
```javascript
    function Person() {}  // 함수 선언
    var p = new Person(); // 함수 호출 시 앞에 new를 붙여 객체 생성

    // 생성자 내에서 객체의 property 정의 → 초기화(재사용성⬆︎)
    function Person(name) {
        this.name = name;
        this.introduce = function() {
            return 'My name is ' + this.name;
        }
    }
    var p1 = new Person('egoing');
    var p2 = new Person('leezche');
```
  
```javascript
    var Human  = function(name, hp, power) {
        this.name = name;
        this.hp = hp;
        this.power = power;
        this.attack = function(target) {
            target.hp -= this.power;
        };
        this.show = function() {
            console.log(
                this.name, this.hp, this.mp, this.power
            );
        };
    };

    var m1 = new Human("Eve", 100, 10);
    var m2 = new Human("Crong", 999, 1);
    m1.attack(m2);
    m2.attack(m1);
    //m1, m2는 객체 또는 인스턴스라고 한다. 그리고 참조 변수이다.
```
  
 
  ### [생성자를 사용하는 이유]
1. 객체를 하나만 만들 때는 간단히 json 표기법으로 만든다.
2. 여러 객체를 만들고 싶을 때는 생성자를 통해서 만든다.

<br>

## switch
```javascript
    switch (expression) {
        case value1:
            statement;
            break;
        case value2:
            statement;
            break;
        ...
        case valueN:
            statement;
            break;
        default:
            statement;
            break;    
    }
```
 1. expression과 valueN이 일치한다면 statement가 실행되고, break가 올 때까지 case절 내부가 실행된다.
 1. break가 오지 않는다면 break가 나올 때까지 다음 case가 진행된다.
 1. 일치하는 case가 없을 때 default가 있으면 default가 실행된다.
 1. 만약 default 전에 일치하는 case가 있고,break가 없어서 default절이 실행될 수도 있다.
   
<br>

## Math
```javascript
    Math.pow(base, exponent)
    Math.pow(7, 2);  //49
    Math.pow(2, 10); // 1024
```

base의 exponent승을 계산하는 Math 메서드
```javascript
    Math.PI
```
pi값(3.14....)

<br>

## Rest parameter
```javascript
    function myFun(a, b, ...manyMoreArgs) {
        console.log("a", a); 
        console.log("b", b);
        console.log("manyMoreArgs", manyMoreArgs); 
    }

    myFun("one", "two", "three", "four", "five", "six");

    // Console Output:
    // a, one
    // b, two
    // manyMoreArgs, [three, four, five, six]
```
1. 함수의 마지막 매개변수 앞에 ...을 붙여 모든 나머지 인수를 배열로 대체
2. myFun("one", "two", "three")로 인자가 3개가 들어간다고 하더라도 마지막 인자는 배열이다.(원소가 하나인 배열)
3. myFun("one", "two")로 세 번째 인자가 없으면 manyMoreArgs는 원소가 없는 빈 배열이다.
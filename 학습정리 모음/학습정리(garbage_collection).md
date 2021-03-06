# ✏️Garbage Collection
자바스크립트는 눈에 보이지 않는 곳에서 메모리 관리를 수행한다.<br>
원시값, 객체, 함수 등 우리가 만드는 모든 것은 메모리를 차지한다. 그렇다면 더는 쓸모 없어지게 된 것들은 어떻게 처리될까? 자바스크립트 엔진이 garbage collection으로 필요 없는 것을 찾아내 삭제한다!

<br>

## 📌 Reachability
자바스크립트는 도달 가능성(reachability)이라는 개념을 사용해 메모리 관리를 수행한다. '도달 가능한(reachable)' 값은 어떻게든 접근할 수 있는 값을 말한다. **도달 가능한, 접근 가능한 값은 메모리에서 삭제되지 않는다.**

<br>

1. 아래 값들은 태생부터 reachable이기 때문에 삭제되지 않는다.
    - 현재 함수의 지역변수, 매개변수
    - 중첩 함수 체인에 있는 함수에서 사용되는 변수, 매개변수
    - 전역 변수
    - 기타 등등
이런 값을 루트(root)라고 한다.

<br>

2. 루트가 참조하는 값, 체이닝으로 루트에서 참조할 수 있는 값 = reachable <br>
   전역 변수에 객체가 저장되어 있다면, 이 객체의 프로퍼티가 또 다른 객체를 참조하고 있다면, 프로퍼티가 참조하는 객체는 도달 가능한 값이다. 이 객체가 참조하는 모든 것들도 도달 가능하다고 여겨진다. 

<br>

자바스크립트 엔진에서는 garbage collector가 끊임없이 동작한다. 가비지 컬렉터는 모든 객체를 모니터링하고, 도달할 수 없는 객체는 삭제한다.

<br>
<br>

## 📌 예시로 이해하기
```javascript
// user에는 객체 참조 값이 저장
let user = {
    name: 'John'
};

// user의 값을 다른 값으로 덮음
user = null;
```
`user`의 값을 다른 값으로 덮어쓰면, 위에서 참조한 객체(John)에 접근할 방법이 사라진다. 즉, 도달할 수 없는 상태가 된 것이다. 따라서 garbage collector는 John 객체의 데이터와 객체를 메모리에서 삭제한다.

<br>

```javascript
// user에는 객체 참조 값 저장
let user = {
    name: "John"
};

// admin에 John 객체 참조 값 저장 
let admin = user;

// user의 값을 다른 값으로 덮음
user = null;
```
전역 변수 `admin`을 통해 여전히 객체 John에 접근할 수 있기 때문에 John은 메모리에서 삭제되지 않는다. `admin`을 다른 값으로 덮어쓰면 객체 John은 메모리에서 삭제될 수 있다.(접근 불가능일 때)

<br>

더 많은 경우에 대한 예시는 참고 출처를 통해 보도록!<br>

<br>
<br>

---

### 참고 출처
<https://ko.javascript.info/garbage-collection>
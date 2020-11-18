# ✏️Event Bubbling, Capturing, target

중첩된 요소에서 이벤트가 발생할 때, HTML DOM API의 이벤트 전파(Event Propagation)는 두 가지 방식으로 구분된다. <br>
이 두 가지 방식이 Bubbling, Capturing이다.

- Bubbling: 이벤트가 발생한 요소부터 window까지 이벤트 전파 (하위 → 상위)
- Capturing: window로부터 이벤트가 발생한 요소까지 이벤트 전파 (상위 → 하위)

<br>

## 📌 Bubbling
```javascript
<form onclick="alert('form')">
    <div onclick="alert('div')">
        <p onclick="alert('p')"></p>
    </div>
</form>
```
가장 안 쪽의 \<p>를 클릭하면
1. `<p>` onclick 핸들러 동작
2. `<div>` onclick 핸들러 동작
3. `<form>` onclick 핸들러 동작
4. `document` 객체를 만날 때까지, 각 요소에 할당된 onclick 핸들러 동작
   
이런 흐름을 `이벤트 버블링`이라고 부른다. **이벤트가 제일 깊은 곳에 있는 요소에서 시작해 부모 요소를 거슬러 올라가며 발생**하는 모양이 bubble과 닮아서!

<br>

## 📌 event.target
부모 요소의 핸들러는 이벤트가 어디서 발생했는지 등에 대한 정보를 얻을 수 있다. <br>
**이벤트가 발생한 가장 안쪽의 요소**는 target 요소라고 불리고, `event.target`을 사용해 접근할 수 있다.

- `event.target` : 실제 이벤트가 시작된 요소. 버블링이 진행되어도 변하지 않음.
- `this(=event.currentTarget)` : 현재 실행중인 핸들러가 할당된 요소를 참조.

위의 예시를 보면, 핸들러는 `form.onclick`하나밖에 없지만 이 핸들러에서 폼 안의 모든 요소에서 발생하는 클릭 이벤트를 '잡아내고(catch)'있다. 클릭 이벤트가 어디서 발생했든 상관없이 `<form>` 요소까지 이벤트가 버블링되어 핸들러를 실행시키기 때문이다.

`form.onclick` 핸들러 내의 `this`와 `event.target`은 다음과 같다.
- `event.target` : form 안쪽에 실제 클릭한 요소
- `this(event.currentTarget)` : form 요소

<br>

## 📌 버블링 중단
이벤트 버블링은 target에서 시작해서 `document` 객체를 만날 때까지 각 노드에서 모두 발생한다. 이 때 모든 핸들러가 호출된다. 그런데 핸들러에게 이벤트 처리 후 버블링을 중단하도록 명령할 수 있다. <br>

이벤트 객체의 메서드인 `event.stopPropagation()`을 사용하면 된다.
```javascript
<body onclick="alert('버블링은 여기까지 도달X')">
    <button onclick="event.stopPropagation()">클릭</button>
</body>
```
<br>

>❗️ **꼭 필요한 경우를 제외하고는 버블링을 막지 말자.** <br>
이벤트 버블링을 막아야 하는 경우는 거의 없다. 버블링은 유용한 경우가 많기 때문에 꼭 멈춰야 하는 상황이 아니라면 버블링은 막지 않는 것이 좋다. 버블링을 막아야 해결되는 문제라면 커스텀 이벤트 등을 사용해 문제를 해결할 수 있다. 

<br>

## 📌 Capturing
실제 코드에서 자주 쓰이진 않지만, 종종 유용한 경우가 있다. <br>

표준 DOM Event에서 정의한 이벤트 흐름엔 3가지 단계가 있다.
1. Capturing 단계 : 이벤트가 하위 요소로 전파
2. Target 단계 : 이벤트가 실제 타깃 요소에 전달되는 단계
3. Bubbling 단계 : 이벤트가 상위 요소로 전파되는 단계

캡처링 단계를 이용해야 하는 경우는 흔치 않다. 캡처링 단계에서 이벤트를 잡아내려면 `addEventListener`의 `capture` 옵션을 `true`로 설정해야 한다.
```javascript
target.addEventListener(type, listener[, useCapture]);
→ target.addEventListener("click", function(){}, true);
```
`useCapture` 옵션은 캡처링 여부를 뜻한다. 
- `false(default)`이면 핸들러는 **버블링 단계**에서 동작
- `true`이면 핸들러는 **캡처링 단계**에서 동작

<br>

❗️ 핸들러를 제거할 때 removeEventListener가 같은 단계에 있어야 한다. <br>
 `addEventListener(..., true)`로 핸들러를 할당해 줬다면, <br>
 `removeEventListener(..., true)`를 사용해 지워야 한다. <br> 
 같은 단계에 있어야 핸들러가 지워진다!

❗️ 같은 요소와 같은 단계에 설정한 리스너는 설정한 순서대로 동작한다. <br>
특정 요소에 `addEventListener`를 사용해 한 단계에 이벤트 핸들러를 여러 개 설정했다면 이 핸들러들은 설정한 순서대로 동작한다.
```javascript
elem.addEventListener("click", e => alert(1)); // 첫 번째로 트리거
elem.addEventListener("click", e => alert(2));
```


<br>
<br>

---

### 참고 출처
<https://ko.javascript.info/bubbling-and-capturing>
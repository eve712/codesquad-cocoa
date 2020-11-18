# ✏️Event Delegation
캡처링과 버블링을 활용하면 이벤트 핸들링 패턴인 이벤트 위임(event delegation)을 구현할 수 있다.

이벤트 위임은 유사한 여러 요소에 동일한 핸들러를 적용할 때 주로 사용한다. 이벤트 위임을 사용하면 <ins>요소마다 핸들러를 할당하지 않고, 요소의 공통 조상에 이벤트 핸들러를 단 하나만 할당해도 여러 요소를 한꺼번에 다룰 수 있다.</ins>

1. 컨테이너에 하나의 핸들러를 할당
2. 핸들러의 `event.target`을 사용해 이벤트가 발생한 요소가 어디인지 알아냄.
3. 원하는 요소에서 이벤트가 발생했다고 확인되면 이벤트를 핸들링.
   
<br>

### ✱장점
- 많은 핸들러를 할당하지 않아도 되기 때문에 초기화가 단순해지고 메모리가 절약된다.
- 요소를 추가하거나 제거할 때 해당 요소에 할당된 핸들러를 추가하거나 제거할 필요가 없기 때문에 코드가 짧아진다.
- innerHTML이나 유사한 기능을 하는 스크립트로 요소 덩어리를 더하거나 뺄 수 있기 때문에 DOM 수정이 쉬워진다.
  
### ✱단점
- 이벤트 위임을 사용하려면 이벤트가 반드시 버블링되어야 한다. 하지만 몇몇 이벤트는 버블링되지 않는다. 그리고 낮은 레벨에 할당한 핸들러엔 `event.stopPropagation()`을 쓸 수 없다.
- 컨테이너 수준에 할당된 핸들러가 응답할 필요가 있는 이벤트이든 아니든 상관없이 모든 하위 컨테이너에서 발생하는 이벤트에 응답해야 하므로 CPU 작업 부하가 늘어날 수 있다. 그런데 이런 부하는 무시할만한 수준이므로 실제로는 고려하지 않는다.

<br>

## 📌 예시로 이해하기

각 `<td>`마다 `onclick` 핸들러를 할당하는 대신, '모든 이벤트를 잡아내는' 핸들러를 `<table>` 요소에 할당해보자. `<table>` 요소에 할당한 핸들러는 `event.target`을 이용해 어떤 요소가 클릭 되었는지 감지하고, 강조한다.

```javascript
// <td>를 클릭했을 때, 그 칸을 강조하기
let selectedTd;

table.onclick = function(event) {
    let target = event.target; 
    if (target.tagName !== 'TD') return;
    highlight(target); 
};

function highlight(td) {
    selectedTd = td;
    if (selectedTd) { // 이미 강조되어있는 칸이 있다면 원상태로 바꿔줌
        selectedTd.classList.remove('highlight');
    }
    selectedTd.classList.add('highlight'); // 새로운 td를 강조 함
}
```
이렇게 코드를 작성하면 테이블 내 칸의 개수는 많든 적든 상관이 없다. 기능을 유지하면서 `<td>`를 언제라도 넣고 뺄 수 있다.

<br>

하지만 단점도 있다. 위와 같이 구현하면 클릭 이벤트가 `<td>`가 아닌 `<td>` 안에서 동작할 수 있다. 
```javascript
<td>
    <strong>Northwest</strong>
</td>
```
`<strong>`을 클릭하면 `event.target`에 `<strong>`에 해당하는 요소가 저장된다. 따라서 `table.onclick` 핸들러에서 `event.target`을 이용해 클릭 이벤트가 `<td>` 안쪽에서 일어났는지 아닌지를 알아내야 한다.

```javascript
table.onclick = function(event) {
    let td = event.target.closest('td'); // 1
    if(!td) return;  // 2
    if(!table.contains(td)) return;  // 3
    highlight(td);   // 4
}
```
1. `elem.closest(selector)` 메서드는 `elem`의 상위 요소 중 `selector`와 일치하는 가장 근접한 조상 요소를 반환한다. 위 코드에서는 이벤트가 발생한 요소부터 시작해 위로 올라가며 가장 가까운 `<td>` 요소를 찾는다.
2. `event.target`이 `<td>` 안에 있지 않으면 그 즉시 `null`을 반환하므로 아무 작업도 일어나지 않는다.
3. 중첩 테이블이 있는 경우 `event.target`은 현재 테이블 바깥에 있는 `<td>`가 될 수도 있다. 이런 경우를 처리하기 위해 `<td>`가 `table`안에 있는지 확인한다.
4. 진짜 td를 강조.

<br>

```javascript
element.closest(selector)
 // element의 조상 중 가장 가까운 selector 요소를 반환
node.contains(otherNode)
 // node에 otherNode가 존재 여부를 boolean값 반환
```
<br>

## 📌 이벤트 위임 활용 
### ✱HTML 데이터 속성
HTML에 attribute로 `data-`로 시작하는 속성은 무엇이든 사용 가능.
```javascript
<article id="electriccars" data-columns="3" data-index-number="123"></article>
```

JavaScript에서 속성값을 읽기 위해서는, `getAttribute()`를 사용하거나 `dataset`속성을 통해 읽을 수 있다. (dash들은 camelCase로 변환됨)
```javascript
let article = document.getElementById('electirccars');
article.dataset.columns // "3"
article.dataset.indexNumber // "123"
```
각 속성은 string이고 읽고 쓸 수 있다. `article.dataset.columns = 5`로 설정하면 해당 속성을 `"5"`로 변경할 수 있다.

<br>

### ✱버튼 메뉴 구현
'저장', '불러오기', '검색'등의 버튼 메뉴를 구현한다고 가정했을 때 **버튼과 메서드를 어떻게 연결**할 수 있을까. 가장 먼저 버튼 각각에 독립된 핸들러를 할당하는 방법이 생각날 것이다. 하지만 더 우아한 방법이 있다. 메뉴 전체에 핸들러를 하나 추가해주고, 각 버튼의 `data-action`속성에 호출할 메서드를 할당해주는 방법이다.
```javascript
<div id="menu">
    <button data-action="save">저장하기</button>
    <button data-action="load">불러오기</button>
    <button data-action="search">검색하기</button>
</div>

<script>
    class Menu {
        constructor(elem) {
            this.elem = elem;
            elem.onclick = this.onClick.bind(this);
        }
        save() { alert('저장'); }
        load() { alert('불러오기'); }
        search() { alert('검색'); }
        onClick(event) {
            let action = event.target.dataset.action;
            if (action) {
                this[action]();
            }
        }
    }
    new Menu(menu);
</script>
```

<br>
<br>

---

### 참고 출처
<https://ko.javascript.info/event-delegation>
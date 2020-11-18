## 📌 Skeleton Code
```javascript
class TodoModel {
    constructor() {
        this.modelArray = [];
        this.countId = 1;
    }
    // 1. input 입력값을 받아서 배열에 추가
    addToArray() {

    }
    // 2. checked 상태 업데이트
    updateChecked() {

    }
    // 3. remove 발생하면 배열 업데이트
    updateRemove() {

    }
    // 4. 배열 반환
    getModelArray() {

    }
}
class TodoView {
    constructor(reference) {
        this.inputEl = reference.inputEl;
        this.addButton = reference.addButton;
        this.listWrapper = reference.listWrapper;
        this.todoModel = reference.todoModel;
    }
    // 0. 이벤트 리스너 작성
    initEvent() {

    }
    // 1. add버튼 누르면 list 추가
    addList() {

    }
    // 2. 체크하면 취소선
    makeLineThrough() {

    }
    // 3. 휴지통 누르면 List 삭제
    removeListItem() {
        
    }
}
```
```javascript
// DOM reference
// DOM 참조한 것을 객체에 미리 저장
const reference = {
    inputEl: document.getElementById('inputText'),
    addButton: document.getElementById('addButton'),
    listWrapper: document.getElementById('list'),
    todoModel: new TodoModel(),
}
// TodoView에 DOM 참조해놓은 객체 전달
new TodoView(reference);
```
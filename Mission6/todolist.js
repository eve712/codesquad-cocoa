class TodoModel {
    constructor() {
        this.modelArray = [];
        this.countId = 1;
    }
    // 1. input 입력값을 받아서 배열에 추가
    addToArray(task) {
        const modelObj = {
            elementId: this.countId++,
            task: task,
            checked: false
        };
        if (task !== '') {
            this.modelArray.push(modelObj);
        }
        return modelObj;
    }
    // 2. checked 상태 업데이트
    updateChecked(id) {
        const targetIndex = this.getTargetIndex(id);
        const targetEl = this.modelArray[targetIndex];
        if (targetEl.checked === false) {
            targetEl.checked = true;       
        } else {
            targetEl.checked = false;
        }
    }
    // 3. remove 발생하면 배열 업데이트
    updateRemove(id) {
        this.modelArray.splice(this.getTargetIndex(id), 1);
    }
    getTargetIndex(id) {
        const targetIndex = this.modelArray.findIndex(el => el.elementId === parseInt(id));
        return targetIndex;
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
    initEvent(todoViewObj) {
        this.addButton.addEventListener("click", this.addList.bind(this));
        this.listWrapper.addEventListener("click", function({target}) {
            if(target.nodeName === 'LABEL') { todoViewObj.makeLineThrough(target); }
            if(target.nodeName === 'I') { todoViewObj.removeListItem(target); }
        });
    }
    // 1. add버튼 누르면 list 추가
    addList() {
        const task = this.inputEl.value;
        const modelObj = this.todoModel.addToArray(task);
        this.createListItem(modelObj);
        this.inputEl.value = '';
        this.inputEl.focus();
    }
    createListItem(modelObj) {
        const [elementId, task] = [modelObj.elementId, modelObj.task];
        const template = document.getElementById('template');
        const copy = template.content.cloneNode(true);
        const node = document.createTextNode(task);
        copy.querySelector('span').appendChild(node);
        copy.querySelector('li').setAttribute('id', elementId);
        this.listWrapper.appendChild(copy);
    }
    // 2. 체크하면 취소선
    makeLineThrough(target) {
        const checkbox = target.firstElementChild;
        if(!checkbox.checked) {
            checkbox.nextElementSibling.style.textDecoration = "line-through";
        }
        else {
            checkbox.nextElementSibling.removeAttribute("style");
        }
        const elementId = target.parentElement.id;
        this.todoModel.updateChecked(elementId);
    }
    // 3. 휴지통 누르면 List 삭제
    removeListItem(target) {
        const removeEl = target.parentElement.parentElement;
        const removeElId = removeEl.id;
        removeEl.remove();
        this.todoModel.updateRemove(removeElId);
    }
}

// DOM reference - DOM 참조한 것을 객체에 미리 저장
const reference = {
    inputEl: document.getElementById('inputText'),
    addButton: document.getElementById('addButton'),
    listWrapper: document.getElementById('list'),
    todoModel: new TodoModel(),
}
// TodoView에 DOM 참조해놓은 객체 전달
const view = new TodoView(reference);
view.initEvent(view);
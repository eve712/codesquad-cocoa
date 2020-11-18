class TodoModel {
    constructor() {
        this.modelArray = [];
        this.countId = 1;
    }
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
    updateChecked(id) {
        const targetIndex = this.getTargetIndex(id);
        const targetEl = this.modelArray[targetIndex];
        if (targetEl.checked === false) {
            targetEl.checked = true;       
        } else {
            targetEl.checked = false;
        }
    }
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
    initEvent(todoViewObj) {
        this.addButton.addEventListener("click", this.addList.bind(this));
        this.listWrapper.addEventListener("click", function({target}) {
            if(target.nodeName === 'LABEL') { todoViewObj.makeLineThrough(target); }
            if(target.nodeName === 'I') { todoViewObj.removeListItem(target); }
        });
    }
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
    makeLineThrough(target) {
        const checkbox = target.firstElementChild;
        if(!checkbox.checked) {
            checkbox.nextElementSibling.classList.add('taskText');
        }
        else {
            checkbox.nextElementSibling.classList.remove('taskText');
        }
        const elementId = target.parentElement.id;
        this.todoModel.updateChecked(elementId);
    }
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
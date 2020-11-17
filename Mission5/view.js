class View {
    constructor() {
        this.inputText = document.getElementById('inputText');
        this.addButton = document.getElementById('addButton');
        this.list = document.getElementById('list');
    }
    createListItem (value) {
        const template = document.getElementById('template');
        const copy = template.content.cloneNode(true);
        const node = document.createTextNode(value);
        copy.querySelector('span').appendChild(node);
        this.list.appendChild(copy);
    }
    addList() {
        let value = this.inputText.value;
        this.createListItem(value);
        this.inputText.value = '';
        this.inputText.focus();
    }
    makeLineThrough(eventTarget) {
        let checkbox = eventTarget.firstElementChild;
        if(!checkbox.checked) {
            checkbox.nextElementSibling.style.textDecoration = "line-through";
        }
        else {
            checkbox.nextElementSibling.removeAttribute("style");
        }
    }
    removeListItem(eventTarget) {
        eventTarget.parentElement.parentElement.remove();
    }
}
let view = new View();

// 1. add 버튼 클릭 → 리스트 추가
view.addButton.addEventListener("click", view.addList.bind(view));

// 2. label 클릭 → 체크상태따라 취소선 / i 클릭 → 요소 삭제
view.list.addEventListener("click", function(e) {
    let eventTarget = e.target;
    if(eventTarget.nodeName === 'LABEL') { view.makeLineThrough(eventTarget); }
    if(eventTarget.nodeName === 'I') { view.removeListItem(eventTarget); }
});


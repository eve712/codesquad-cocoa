// todolist처리
class View {
    constructor() {
        this.inputText = document.getElementById('inputText');
        this.addButton = document.getElementById('addButton');
        this.list = document.getElementById('list');
        this.listLabels = document.getElementsByClassName('label');
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
    }
    makeLineThrough() {
        for(let item of view.listLabels) {
            let checkbox = item.firstElementChild;
            if(!checkbox.checked) {
                checkbox.nextElementSibling.style.textDecoration = "line-through";
            }
            else {
                checkbox.nextElementSibling.removeAttribute("style");
            }
        }
    }
}
let view = new View();

// 1. add 버튼 클릭 → 리스트 추가
view.addButton.addEventListener("click", view.addList.bind(view));

// 2. label 클릭 → 체크상태따라 취소선 / i 클릭 → 요소 삭제
view.list.addEventListener("click", function(e) {
    if(e.target.nodeName === 'I') {
        e.target.parentElement.parentElement.remove();
    }
    if(e.target.nodeName === 'LABEL') {
        view.makeLineThrough();
    }
});





// view.list.addEventListener("click", view.makeLineThrough.bind(view));
// 이렇게 했을 때는 (checkbox.checked)로 해야 됨.

// todolist처리
class Model {
    constructor() {
        this.inputText = document.getElementById('inputText');
        this.addButton = document.getElementById('addButton');
        this.list = document.getElementById('list');
        this.checkboxes = document.getElementsByClassName('check');
        this.removebuttons = document.getElementsByClassName('remove');
    }
    createListItem (value) {
        const template = document.getElementById('template');
        const copy = template.content.cloneNode(true);
        const node = document.createTextNode(value);
        copy.querySelector('label').appendChild(node);
        this.list.appendChild(copy);
    }
    addList() {
        let value = model.inputText.value;
        model.createListItem(value);
    }
}

// test
let model = new Model();
model.addButton.addEventListener("click", model.addList);
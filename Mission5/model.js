// todolist처리
class Model {
    constructor() {
        this.inputText = document.getElementById('inputText');
        this.addButton = document.getElementById('addButton');
        this.list = document.getElementById('list');
        this.listItems = document.querySelectorAll('#list > li');
        this.checkboxes = document.getElementsByClassName('check');
        this.removebuttons = document.getElementsByClassName('remove');
    }
    createListItem (value) {
        const template = document.getElementById('template');
        const copy = template.content.cloneNode(true);
        const node = document.createTextNode(value);
        copy.querySelector('span').appendChild(node);
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

for(let listItem of model.listItems) {
    console.log(listItem);
}

/*
for(let listItem of model.listItems) {
    listItem.addEventListener("click", function() {
        const checkbox = this.firstElementChild.firstElementChild;
        if(checkbox.checked) {
            checkbox.nextElementSibling.style.textDecoration = "line-through";
        }
    });
}
*/
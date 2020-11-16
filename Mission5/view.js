// todolist처리
class View {
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
        let value = this.inputText.value;
        this.createListItem(value);
        this.listItems = document.querySelectorAll('#list > li');
    }
}

// test
let view = new View();

view.addButton.addEventListener("click", view.addList.bind(view));



/*
for(let listItem of view.listItems) {
    listItem.addEventListener("click", function() {
        const checkbox = this.firstElementChild.firstElementChild;
        if(checkbox.checked) {
            checkbox.nextElementSibling.style.textDecoration = "line-through";
        }
    });
}
*/
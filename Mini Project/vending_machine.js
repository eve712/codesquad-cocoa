// ------------● Menu Data ●--------------
// 메뉴데이터 생성자
const DataTemplate = function(el, idx, obj) {
    this.number = idx + 1;
    this.name = obj.createName(el);
    this.price = el.lastElementChild.innerText;
}

// 메뉴데이터 생성메서드, 메뉴데이터 배열
class MenuData {
    constructor(obj) {
        this.menuElArr = obj.menu; 
        this.menuDataArr = [];
    }
    createName(el) {
        const numberName = el.firstElementChild.nextElementSibling.innerText;
        const lastIdx = 1;
        const name = numberName.split('. ')[lastIdx];
        return name;
    }
    createData() {
        const arrLike = this.menuElArr;
        this.menuDataArr = [...arrLike].map((el, idx) => new DataTemplate(el, idx, this));
    }
}


// ------DOM 참조------
const reference = {
    menu: document.getElementsByClassName('menu')
}


// ------ test ------
const menuData = new MenuData(reference);
menuData.createData();  // menuDataArr 생성
console.log(menuData.menuDataArr);

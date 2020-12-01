// ------------● Menu Data ●--------------
// 메뉴데이터 생성자
const DataTemplate = function(el, idx, obj) {
    this.number = idx + 1;
    this.name = obj.getName(el);
    this.price = el.lastElementChild.innerText;
}

// 메뉴데이터 생성메서드, 메뉴데이터 배열
class MenuData {
    constructor(obj) {
        this.menuElArr = obj.menu; 
        this.menuDataArr = [];
    }
    getName(el) {
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

// ------------● Wallet Data ●--------------
// 사이트가 로드될 때 지갑의 초기값을 설정해주는 클래스. (이후 변동은 view클래스에서 적용)
class WalletData {
    constructor() {
        this.coin100;
        this.coin500;
        this.paper1000;
        this.paper5000;
        this.paper10000;
        this.moneyNumArr = [];
    }
    getRandomNum (min, max) {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    }
    assignNum (min1, max1, min2, max2) {
        this.coin100 = this.getRandomNum(min1, max1);
        this.paper1000 = this.getRandomNum(min1, max1);
        this.coin500 = this.getRandomNum(min2, max2);
        this.paper5000 = this.getRandomNum(min2, max2);
        this.paper10000 = this.getRandomNum(min2, max2);
    }
    assignNumArr() {
        this.moneyNumArr = [this.coin100, this.coin500, this.paper1000, this.paper5000, this.paper10000];
    }
    initMoneyNum(min1, max1, min2, max2) {
        this.assignNum(min1, max1, min2, max2);
        this.assignNumArr();
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

const walletData = new WalletData();
walletData.initMoneyNum(4, 9, 2, 5); // 지갑의 초기값 설정
console.log(walletData.moneyNumArr);

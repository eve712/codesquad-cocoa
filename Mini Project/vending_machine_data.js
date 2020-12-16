
// -----------------------● Menu Data ●-----------------------
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


// -----------------------● Wallet Data ●-----------------------
const SoldItemTemplate = function(number, name) {
    this.number = number;
    this.name = name;
    this.times = 1;
}
// 사이트가 로드될 때 지갑의 초기값을 설정해주는 클래스. (이후 변동은 view클래스에서 적용)
class WalletData {
    constructor() {
        // view 클래스에서 쓰려고 문자열로..
        this.value = ['100', '500', '1000', '5000', '10000']; 
        this.moneyNumArr = [];
        this.total;
        this.coinsWindow = 0;
        this.sales = 0;
        this.soldItems = [];
    }
    // 개수, 배열, 총합 구하는 함수
    initMoneyNum(min1, max1, min2, max2) {
        this.assignNumArr(min1, max1, min2, max2);
        this.sumAmount(this);
    }
    // 동전, 지폐 개수 랜덤 뽑아 배열에 저장
    assignNumArr(min1, max1, min2, max2) {
        this.moneyNumArr = [
            this.getRandomNum(min1, max1), // 100
            this.getRandomNum(min2, max2), // 500
            this.getRandomNum(min1, max1), // 1000
            this.getRandomNum(min2, max2), // 5000
            this.getRandomNum(min2, max2), // 1000
        ];
    }
    getRandomNum (min, max) {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    }
    // 총 금액의 합 구하는 함수
    sumAmount(obj) {
        const num = obj.moneyNumArr;
        this.total = obj.value.reduce((acc, curr, i) => acc + (curr * num[i]), 0);
    }
    // view 클래스에서 사용하는 coinsWindow 데이터 관리 함수
    setCoinsWindow(money) {
        this.coinsWindow = money;
    }
    addCoinsWindow(money) {
        this.coinsWindow += money;
    }
    // 매개변수로 받은 아이템이 soldItems 배열에 있는지 확인해서
    // 없으면 객체를 생성, 있으면 판매횟수 +1
    putSoldItem(number, name) {
        const soldItemNum = this.soldItems.map(el => el.number);
        const idx = soldItemNum.indexOf(number);
        if(idx === -1) {
            const soldItem = new SoldItemTemplate(number, name);
            this.soldItems.push(soldItem);
        }
        else this.soldItems[idx].times++;
        console.log(this.soldItems);
    }
}


// ------DOM 참조------
const reference = {
    menu: document.getElementsByClassName('menu'),
    moneyWrap: document.getElementsByClassName('money_wrap'),
    walletTotal: document.getElementById('total'),
    process: document.getElementById('process'),
    soldBtn: document.getElementById('soldBtn'),
    sales: document.getElementById('sales'),
    soldItems: document.getElementById('soldItems'),
    coinsWindow: document.getElementById('coins_window'),
    numWindow: document.getElementById('num_window'),
    numberBtn: document.getElementsByClassName('number'),
    deleteBtn: document.getElementById('del_btn'),
    buttonBox: document.getElementById('btn_box'),
    alertNum: document.getElementById('alert_num'), // 모달창
    alertMoney: document.getElementById('alert_money'), // 모달창
    alertSold: document.getElementById('alert_soldItems'), //모달창
    closeBtns: [...document.getElementsByClassName('alert')].map(el => el.lastElementChild)
}


// ------ test ------
const menuData = new MenuData(reference);
menuData.createData();  // menuDataArr 생성
console.log(menuData.menuDataArr);

const walletData = new WalletData();
walletData.initMoneyNum(4, 9, 2, 5); // 지갑의 초기값 설정
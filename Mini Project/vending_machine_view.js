
// -----------------------● 지갑 클릭했을 때 View 클래스 ●-----------------------
class ViewOfWallet {
    constructor(reference, walletData, {menuDataArr}) {
        this.menuArr = [...reference.menu];
        this.wrapArr = [...reference.moneyWrap];
        this.totalEl = reference.walletTotal;
        this.processEl = reference.process;
        this.coinsWindowEl = reference.coinsWindow;
        this.menuData = menuDataArr; // 매뉴데이터 - 배열
        this.walletData = walletData; // 지갑데이터 - 객체
        this.coinsWindow = 0;
    }
    // wallet 클릭 이벤트
    setWalletEvent() {
        const elArr = this.wrapArr.map(el => el.firstElementChild);
        elArr.forEach(el => el.addEventListener('click', this.checkWallet.bind(this)));
    }
    // wallet 클릭 이벤트 핸들러
    checkWallet({target}) {
        const text = target.innerText;
        const amount = text.substring(0, text.length - 1);
        const idx = this.walletData.value.indexOf(amount);
        if(this.walletData.moneyNumArr[idx] < 1) return; // 현금 개수가 1보다 작다면 리턴
        else {
            this.fixWallet(idx);
            this.viewProcess(text);
            this.viewCoinsWindow(amount);
            this.viewPossibleMenu();
        };
    }
    // this.wallet 값을 변경 (moneyNumArr 현금 개수, total 합계)
    fixWallet(idx) {
        this.walletData.moneyNumArr[idx]--;
        this.walletData.sumAmount(this.walletData);
        this.viewWallet();
    }
    // this.wallet의 데이터를 사용 → wallet 개수, 합계 출력
    viewWallet() {
        const elArr = this.wrapArr.map(el => el.lastElementChild);
        elArr.forEach((el, i) => el.innerText = this.walletData.moneyNumArr[i]);
        this.totalEl.innerText = this.walletData.total;
    }
    // process창에 과정 출력
    viewProcess(text) {
        this.processEl.innerHTML += `<span> ${text} 투입!</span> <br>`;
    }
    // coins window창에 투입 금액 출력
    viewCoinsWindow(amount) {
        const num = parseInt(amount);
        this.coinsWindow += num;
        this.coinsWindowEl.innerText = this.coinsWindow;
    }
    // 구매가능한 메뉴에 클래스 추가
    viewPossibleMenu() {
        const objArr = this.menuData.filter(el => el.price <= this.coinsWindow);
        const idxArr = objArr.map(el => el.number - 1);
        idxArr.forEach(idx => {
            this.menuArr[idx].firstElementChild.nextElementSibling.classList.add('possible_name');
            this.menuArr[idx].lastElementChild.classList.add('possible_price');
        });
    }
}

// -----------------------● 번호 선택해서 num_window에 출력하는 View 클래스 ●-----------------------
class ViewOfNumber {
    constructor(reference) {
        this.menuArr = [...reference.menu];
        this.numBtnsArr = [...reference.numberBtn];
        this.numWindowEl = reference.numWindow;
        this.delBtn = reference.deleteBtn;
    }
    // elArr의 요소들에 클릭이벤트 설정해주는 함수
    setClickEvent(elArr, func) {
        elArr.forEach(el => el.addEventListener('click', func.bind(this)));
    }

    // board 클릭 이벤트
    setBoardEvent() {
        const elArr = this.menuArr.map(el => el.firstElementChild);
        this.setClickEvent(elArr, this.viewMenuNum);
    }
    viewMenuNum({target}) {
        const menuNum = target.nextElementSibling.innerText.split('. ')[0];
        this.numWindowEl.innerText = menuNum;
    }

    // 숫자 버튼 클릭 이벤트
    setNumBtnEvent() {
        const elArr = this.numBtnsArr;
        this.setClickEvent(elArr, this.viewNumber);
    }
    viewNumber({target}) {
        const num = target.innerText;
        const text = this.numWindowEl.innerText;
        if(text.length == 2) return;
        else {
            this.numWindowEl.innerText += num;
        }
    }

    // 지우기 버튼 클릭 이벤트
    setDelBtnEvent() {
        this.delBtn.addEventListener('click', this.eraseNumber.bind(this));
    }
    eraseNumber() {
        const text = this.numWindowEl.innerText;
        const length = text.length;
        this.numWindowEl.innerText = text.substring(0, length - 1);
    }
}

// -----------------------● 선택 버튼 클릭했을 때 View 클래스 ●-----------------------
class ViewOfButton {
    constructor(reference, {menuDataArr}) {
        this.selectBtn = reference.buttonBox.lastElementChild;
        this.closeBtns = reference.closeBtns;
        this.coinsWindowEl = reference.coinsWindow;
        this.numWindowEl = reference.numWindow;
        this.alertNumEl = reference.alertNum; // 모달창
        this.alertMoneyEl = reference.alertMoney; // 모달창
        this.processEl = reference.process;
        this.menuData = menuDataArr; // 매뉴데이터 - 배열
        this.price;
        this.money;
    }
    // 선택 버튼 클릭 이벤트
    setSelectEvent() {
        this.selectBtn.addEventListener('click', this.checkNumber.bind(this));
        this.closeBtns.forEach( el => el.addEventListener('click', this.closeAlert.bind(this)));
    }
    // 입력한 메뉴 번호 확인
    checkNumber() {
        const isExisting = this.isExisting()
        if(!isExisting) this.alertNumEl.classList.remove('hidden');
        else this.checkMoney();
    }
    // 입력한 번호의 메뉴가 존재하는지 확인
    isExisting() {
        const number = this.numWindowEl.innerText;
        const numOfMenu = this.menuData.length;
        const result = number > 0 && number <= numOfMenu;
        return result;
    }
    // 투입된 금액, 가격 확인
    checkMoney() {
        const isLarger = this.isLarger();
        if(!isLarger) this.alertMoneyEl.classList.remove('hidden');
        else {
            this.viewProcess();
            this.coinsWindowEl.innerText = this.money - this.price;
            this.numWindowEl.innerText = '';
        }
    }
    // 투입된 돈이 가격보다 큰지(살 수 있는지) 여부 확인
    isLarger() {
        const idx = this.numWindowEl.innerText - 1;
        this.price = this.menuData[idx].price;
        this.money = this.coinsWindowEl.innerText;
        return this.money > this.price;
    }
    // process창에 과정 출력
    viewProcess() {
        const number = this.numWindowEl.innerText;
        const name = this.menuData[number - 1].name;
        this.processEl.innerHTML += `<span> ${number}번 ${name} 구매 완료!</span> <br>`;
    }
    // 모달창이 떴을 때 닫기 버튼 이벤트 핸들러
    closeAlert({target}) {
        const id = target.parentElement.parentElement.id;
        if( id === 'alert_money') this.alertMoneyEl.classList.add('hidden');
        else {
            this.alertNumEl.classList.add('hidden');
            this.numWindowEl.innerText = '';
        }
    }
}



// ------● 실행 ●------
const viewOfWallet = new ViewOfWallet(reference, walletData, menuData);
viewOfWallet.viewWallet();
viewOfWallet.setWalletEvent();

const viewOfNumber = new ViewOfNumber(reference);
viewOfNumber.setBoardEvent();
viewOfNumber.setNumBtnEvent();
viewOfNumber.setDelBtnEvent();

const viewOfButton = new ViewOfButton(reference, menuData);
viewOfButton.setSelectEvent();
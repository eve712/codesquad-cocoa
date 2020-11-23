
//----●● 1초 이상 머무르면 list 보여주기 ●●--------------------
class ShowingList {
    constructor({titleOfList, container, fruitList}) {
        this.titleOfList = titleOfList;
        this.container = container;
        this.fruitList = fruitList;
        this.timerOfTitle = null;
    }
    initEvent() {
        this.titleOfList.addEventListener('mouseenter', this.setTimer.bind(this));
        this.titleOfList.addEventListener('mouseleave', this.clearTimer.bind(this));
        this.container.addEventListener('mouseleave', this.hideList.bind(this));
    }
    showList() {
        this.fruitList.classList.remove('hiddenList');
        this.fruitList.classList.add('shownList');
    }
    hideList() {
        this.fruitList.classList.remove('shownList');
        this.fruitList.classList.add('hiddenList');        
    }
    // 타이머 설정, 타이머ID 할당
    setTimer() {
        this.timerOfTitle = setTimeout(this.showList.bind(this), 1000);    
    }
    // 타이머 해제
    clearTimer() {
        clearTimeout(this.timerOfTitle);    
    }
}


//----●● 마우스 이동정보 출력 ●●--------------------
class CountingList {
    constructor({listItem}) {
        this.listItem = listItem;
        this.timerOfList = null;
    }
    initEvent() {
        this.listItem.forEach(el => el.addEventListener('mouseenter', this.setPrinter.bind(this)));
        this.listItem.forEach(el => el.addEventListener('mouseleave', this.clearPrinter.bind(this)));
    }
    createPrintingEl(target) {
        const box = document.getElementById('counting');
        let el = document.createElement('div');
        el.id = target.innerText;
        el.innerText = `${target.innerText} : 1`;
        box.appendChild(el);
    }    
    // 매개변수 el = div로 새로 만들어진 요소 (printedEl)
    count(el) {
        let textArr = el.innerText.split(' : ');
        let count = textArr[1];
        el.innerText = `${el.id} : ${++count}`;
    }
    // 매개변수 target = mouseenter 이벤트된 li 요소
    setPrinter({target}) {
        let printingEl = document.getElementById(target.innerText);
        if (!printingEl) this.createPrintingEl(target);
        let printedEl = document.getElementById(target.innerText);
        this.timerOfList = setInterval(this.count.bind(null, printedEl), 500);    
    }
    clearPrinter() {
        clearInterval(this.timerOfList);
    }
}

//----------------------------------------------------

const reference = {
    titleOfList: document.getElementById('titleOfList'),
    container: document.getElementById('container'),
    fruitList: document.getElementById('fruitList'),
    listItem:  document.querySelectorAll('#fruitList > li')
}

let showingList = new ShowingList(reference);
showingList.initEvent();
let countingList = new CountingList(reference);
countingList.initEvent();

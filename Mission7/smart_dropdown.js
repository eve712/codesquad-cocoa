
//----●● 1초 이상 머무르면 list 보여주기 ●●--------------------
class ShowingList {
    constructor({titleOfList, container, fruitList}) {
        this.titleOfList = titleOfList;
        this.container = container;
        this.fruitList = fruitList;
        this.timerOfTitle;
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
    setTimer() {
        this.timerOfTitle = setTimeout(this.showList.bind(this), 1000);    
    }
    clearTimer() {
        clearTimeout(this.timerOfTitle);    
    }
}


//----●● 마우스 이동정보 출력 ●●--------------------
class CountingList {
    constructor({listItem, wrapper}) {
        this.listItem = listItem;
        this.wrapper = wrapper;
        this.timerOfPrinting;
    }
    initEvent() {
        this.listItem.forEach(el => el.addEventListener('mouseenter', this.setPrinter.bind(this)));
        this.listItem.forEach(el => el.addEventListener('mouseleave', this.clearPrinter.bind(this)));
    }

    // listItem에 첫 mouseenter 이벤트가 발생할 때 counting해주는 새로운 요소 생성
    createPrintingEl(target) {
        const el = document.createElement('div');
        el.id = target.innerText;
        el.innerText = `${target.innerText} : 1`;
        this.wrapper.appendChild(el);
    }    

    // 마우스가 머문만큼 500ms마다 카운팅
    // 매개변수 el = div로 새로 만들어진 요소(printedEl)
    count(el) {
        let textArr = el.innerText.split(' : ');
        let count = textArr[1];
        el.innerText = `${el.id} : ${++count}`;
    }

    // 카운팅하는 요소가 문서에 이미 있는지 확인하고, 있으면 setInterval로 계속 카운팅
    // 매개변수 target = mouseenter 발생한 li 요소
    setPrinter({target}) {
        let printingEl = document.getElementById(target.innerText);
        if (!printingEl) this.createPrintingEl(target);
        let printedEl = document.getElementById(target.innerText);
        this.timerOfPrinting = setInterval(this.count.bind(null, printedEl), 500);    
    }

    clearPrinter() {
        clearInterval(this.timerOfPrinting);
    }
}

//----------------------------------------------------

const reference = {
    titleOfList: document.getElementById('titleOfList'),
    container: document.getElementById('container'),
    fruitList: document.getElementById('fruitList'),
    listItem:  document.querySelectorAll('#fruitList > li'),
    wrapper: document.getElementById('counting')
}

let showingList = new ShowingList(reference);
showingList.initEvent();
let countingList = new CountingList(reference);
countingList.initEvent();
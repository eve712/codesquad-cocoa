
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
    setTimer() {
        this.timerOfTitle = setTimeout(this.showList.bind(this), 1000);    
    }
    clearTimer() {
        clearTimeout(this.timerOfTitle);    
    }
    showList() {
        this.fruitList.classList.remove('hiddenList');
        this.fruitList.classList.add('shownList');
    }
    hideList() {
        this.fruitList.classList.remove('shownList');
        this.fruitList.classList.add('hiddenList');        
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
        this.listItem.forEach(el => el.addEventListener('mouseenter', this.createPrintingEl.bind(this)) );
        setInterval(this.setEvent.bind(this), 500);
    }
    // listItem에 첫 mouseenter 이벤트가 발생할 때 counting해주는 새로운 요소 생성
    createPrintingEl({target}) {
        let printingEl = document.getElementById(target.innerText);
        if (!printingEl) {
            const el = document.createElement('div');
            el.id = target.innerText;
            el.innerText = `${target.innerText} : 1`;
            this.wrapper.appendChild(el);
        };
    }
    setEvent() {
        this.listItem.forEach(el => el.addEventListener('mousemove', this.count.bind(this), {once: true}));
    }
    // 카운팅하는 요소가 문서에 있으면 setInterval로 계속 카운팅
    // 매개변수 target = mouseenter 발생한 li 요소
    count({target}) {
        let el = document.getElementById(target.innerText);
        let textArr = el.innerText.split(' : ');
        let count = textArr[1];
        el.innerText = `${el.id} : ${++count}`;
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
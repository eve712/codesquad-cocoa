const titleOfList = document.getElementById('titleOfList');
const fruitList = document.getElementById('fruitList');
const listItem = document.querySelectorAll('#fruitList > li');
const container = document.getElementById('container');
let timerOfTitle;
let timerOfList;

//----------------------------------------------------

const showList = function() {
    fruitList.classList.remove('hiddenList');
    fruitList.classList.add('shownList');
};

const hideList = function() {
    fruitList.classList.remove('shownList');
    fruitList.classList.add('hiddenList');
};

// 타이머 설정, 타이머ID 할당
const setTimer = function() {
    timerOfTitle = setTimeout(showList, 1000);
};

// 타이머 해제
const clearTimer = function() {
    clearTimeout(timerOfTitle);
};

//----------------------------------------------------

const createPrintingEl = function(target) {
    let el = document.createElement('div');
    el.id = target.innerText;
    el.innerText = `${target.innerText} : 1`;
    document.body.appendChild(el);
};

// 매개변수 el = div로 새로 만들어진 요소 (printedEl)
const count = function(el) {
    console.log(el);
    let textArr = el.innerText.split(' : ');
    let count = textArr[1];
    el.innerText = `${el.id} : ${++count}`;
};

// 매개변수 target = mouseenter 이벤트된 li 요소
const setPrinter = function({target}) {
    let printingEl = document.getElementById(target.innerText);
    if (!printingEl) createPrintingEl(target);
    printedEl = document.getElementById(target.innerText);
    timerOfList = setInterval(count.bind(null, printedEl), 500);
};

const clearPrinter = function() {
    clearInterval(timerOfList);
};

//----------------------------------------------------

titleOfList.addEventListener('mouseenter', setTimer);
titleOfList.addEventListener('mouseleave', clearTimer);
container.addEventListener('mouseleave', hideList);
listItem.forEach(el => el.addEventListener('mouseenter', setPrinter));
listItem.forEach(el => el.addEventListener('mouseleave', clearPrinter));


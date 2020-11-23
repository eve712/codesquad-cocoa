const titleOfList = document.getElementById('titleOfList');
const fruitList = document.getElementById('fruitList');
const container = document.getElementById('container');
let timerId;

const showList = function() {
    fruitList.classList.remove('hiddenList');
    fruitList.classList.add('shownList');
};

const hideList = function() {
    fruitList.classList.remove('shownList');
    fruitList.classList.add('hiddenList');
}

// 타이머 설정, 타이머ID 할당
const setTimer = function() {
    timerId = setTimeout(showList, 2000);
}
// 타이머 해제
const clearTimer = function() {
    clearTimeout(timerId);
}

titleOfList.addEventListener('mouseenter', setTimer);
titleOfList.addEventListener('mouseleave', clearTimer);
container.addEventListener('mouseleave', hideList);
const header = document.getElementById('titleOfList');
const fruitList = document.getElementById('fruitList');
let timerId;

const showList = function() {
    fruitList.classList.remove('hiddenList');
    fruitList.classList.add('shownList');
};

const hideList = function() {
    fruitList.classList.remove('shownList');
    fruitList.classList.add('hiddenList');
}

// 타이머 설정, timerId값을 참조할 수 있게 리턴
const setTimer = function() {
    timerId = setTimeout(showList, 3000);
}
// 타이머 해제, 메뉴 숨기기
const clearTimer = function() {
    clearTimeout(timerId);
    if (fruitList.classList.contains('shownList')) hideList();
}

header.addEventListener('mouseenter', setTimer);
header.addEventListener('mouseleave', clearTimer);
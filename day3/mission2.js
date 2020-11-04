function factorial(n) {
    if (n === 1) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
}
function calculate(n) {
    let factorialArray = [];
    for(let i = 0; i < n; i++) {
        factorialArray.push(factorial(i + 1));
    }
    return factorialArray;
}

console.log(calculate(4)); // 1, 2, 6, 24

//----------------------------------

const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];

function filterId(str) {
    let result = [];
    result = str.map(nonWordRemv); 
    while(result.indexOf(undefined) != -1) {
        result.splice(result.indexOf(undefined), 1);
    }
    result = result.map(numberRemv);
    return result;
}
function nonWordRemv(item) {
    if (/\W/.test(item) === true) {
        return;
    }
    else {
        return item;
    }
}
function numberRemv(item) {
    item = item.replace(/[0-9]/g, '');
    return item;
}

console.log(filterId(peoples));   // ['honux', 'head', 'zello', 'lucas']

//----------------------------------

const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];

// 각 학생의 평균 점수 배열
let getAverageGrade = grades.map(average);

// 각 학생들의 가장 높은 점수들의 배열
let highestGrade = grades.map((item) => {
    item.sort((a, b) => b - a);
    return item[0];
});

// 배열 원소들의 평균값 구하는 함수
function average(arr) {
    const sum = arr.reduce((prev, curr) => prev + curr);
    return sum / arr.length;
}

console.log(getAverageGrade);
console.log(average(highestGrade));
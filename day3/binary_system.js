
let saveArr = {
    resultArray: [],
    pthAnswer: []
};

// n진수, t개의 숫자까지, m명이 말하고, p번째
function solution(n, t, m, p) {
    saveArr.resultArray.length = 0;
    for(let i = 0; i < t * m; i++) {
        let result = decimalToNSystem(i, n); 
        let arr = stringToArray(result);  
        let arr2 = saveArr.resultArray.concat(arr); 
        saveArr.resultArray = arr2; 
    }
    if(p > 0) {
        return getPthAnswer(m, p);
    }
    else {
        return saveArr.resultArray;
    }
}

// p번째 차례의 답 구하는 함수
function getPthAnswer(m, p) {
    saveArr.pthAnswer.length = 0;
    for (let i = p - 1; i < saveArr.resultArray.length; i += m) {
        saveArr.pthAnswer += saveArr.resultArray[i];
    }
    return saveArr.pthAnswer;
}

// 십진법 수를 n진수로 바꾸는 함수
function decimalToNSystem(decimal, n) {
    let result = decimal.toString(n); 
    return result;
}

// 문자열을 배열로 반환
function stringToArray(string) {
    let arr = string.split("");
    return arr;
}

console.log(solution(2, 4, 2));
console.log(solution(2, 4, 2, 2));
console.log(solution(3, 5, 4));
console.log(solution(16, 5, 3));

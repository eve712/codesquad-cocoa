
// n진법 수로 바꾼 수들의 배열이 들어가 있는 배열 
let resultArray = [];

// n진수, t개의 숫자까지, m명이 말하고, p번째
function solution(n, t, m, p) {
    for(let i = 0; i < t * m; i++) {
        let result = decimalToNSystem(i, n); // n진법 수 문자열로 반환
        let arr = stringToArray(result); // 한 글자씩 쪼개서 배열로 만듦
        let arr2 = resultArray.concat(arr); // 배열합치기
        resultArray = arr2; 
    }
    if(p > 0) {
       return getPthAnswer(m, p);
    }
    else {
        return resultArray;
    }
}
console.log(solution(2, 4, 2));
console.log(solution(2, 4, 2, 2));

// p번째 차례의 답 구하는 함수
function getPthAnswer(m, p) {
    let pthAnswer = [];
    for (let i = p - 1; i < resultArray.length; i += m) {
        pthAnswer += resultArray[i];
    }
    return pthAnswer;
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


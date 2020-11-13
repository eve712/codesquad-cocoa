function solution(arr, divisor) {
    var answer = [];
    let refine = [];
    for (let el of arr) {
        if(el % divisor === 0)
            refine.push(el);
    }
    if (refine.length === 0) {
        answer.push(-1);
    }
    else {
        answer = refine.sort((a, b) => a - b);
    }
    return answer;
}

//----------다른 풀이-----------
// 새 배열, for of, if ➔ 📌 filter(배열반환 + 조건검사)
// if-else ➔ 📌 조건연산자

function solution(arr, divisor) {
    var answer = arr.filter(v => v % divisor === 0);
    return answer.length === 0? [-1] : answer.sort((a,b) => a-b);
}

//-----test-----
arr = [3, 2, 6];
console.log(solution(arr, 10)); // -1

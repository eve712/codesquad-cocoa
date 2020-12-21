function solution(nums) {
    let answer = -1;
    let [startIdx, times] = [0, 1];
    const idxArr = getIdxArr(startIdx, nums.length-3, times);
    const sum = idxArr.map(e => nums[e[0]] + nums[e[1]] + nums[e[2]]);
    const prime = sum.map(e => isPrime(e));
    answer = prime.reduce((a,b) => a + b);
    return answer;
}

//-----------------● 원래 함수 나누기 ●---------------------
function getIdxArr(minIdx, maxIdx, times) {
    let [result, arr] = [[], []];
    for(let i = minIdx; i <= maxIdx; i++) {
        if(times < 3) {
            arr = [i];
            let idx = getIdxArr(minIdx + 1, maxIdx + 1, times + 1);
            result.push(...getResultArr(i, idx, arr, times));
        }
        else arr.push(i);
    }
    if(times === 3) return arr;
    return result;
}

function getResultArr(i, idx, arr, times) {
    let result = [];
    for(let j = 0; j < idx.length; j++) {
        if (i < idx[j] || i < idx[j][0]) {
            let newArr = [...arr];
            if(times < 2) newArr.push(...idx[j]);
            else newArr.push(idx[j]);
            result.push(newArr);
        }
    }
    return result;
}
function isPrime(n) {
    if (n === 2) return 1;
    else {
        for(let i = 2; i < n; i++) {
            if (n % i === 0) return 0;
        }
        return 1;
    }
}

//------------------● test ●--------------------
let nums = [1, 2, 4];
let [startIdx, times] = [0, 1];
console.log(solution(nums));


//------------------● 중첩 심한 반복문... ●--------------------
// function abc(nums) {
//     for(let a = 0; a < nums.length-2; a++) {
//         for(let b = 1; b < nums.length-1; b++) {
//             for(let c = 2; c < nums.length; c++) {
//                 if(a < b && b < c) {
//                     console.log(a, b, c);
//                     let sum = nums[a] + nums[b] + nums[c];
//                     let arr = [sum, nums[a], nums[b], nums[c]];
//                     console.log(arr);
//                     return arr;
//                 }
//             }
//         }
//     }
// }
//----------------● 원래 함수 ●----------------------
// function getIdxArr(minIdx, maxIdx, times) {
//     let [result, arr] = [[], []];
//     for(let i = minIdx; i <= maxIdx; i++) {
//         if(times < 3) {
//             arr = [i];
//             let idx = getIdxArr(minIdx + 1, maxIdx + 1, times + 1);
//             for(let j = 0; j < idx.length; j++) {
//                 if (i < idx[j] || i < idx[j][0]) {
//                     let newArr = [...arr];
//                     if(times < 2) newArr.push(...idx[j]);
//                     else newArr.push(idx[j]);
//                     result.push(newArr);
//                 }
//             }
//         }
//         else arr.push(i);
//     }
//     if(times === 3) return arr;
//     return result;
// }
'use strict';

// HackerRank의 'Compare the Triplets' 문제

function compareTriplets(a, b) {
    let [aPoints, bPoints] = [0, 0];
    for (let i = 0; i < a.length; i++) {
        if(a[i] > b[i]) aPoints++;
        else if(a[i] < b[i]) bPoints++;
    }
    return [aPoints, bPoints];
}

//-------------test--------------
const a = [5, 6, 7];
const b = [3, 6, 10];
console.log(compareTriplets(a, b)); // [1, 1]
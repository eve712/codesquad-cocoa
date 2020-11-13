function solution(numbers) {
    let answer = [];
    let sum = 0;
    let sumArr = [];
    for(let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < numbers.length; j++) {
            if (i !== j) {
                sum = numbers[i] + numbers[j];
                sumArr.push(sum);
            }
        }
    }
    answer = sumArr.reduce((acc,curr) => acc.includes(curr) ? acc : [...acc,curr],[]);
    answer.sort((a, b) => a - b);
    return answer;
}


numbers = [2,1,3,4,1];
console.log(solution(numbers)); //[2,3,4,5,6,7]
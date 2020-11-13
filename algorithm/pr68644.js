function solution(numbers) {
    let sumArr = [];
    for(let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < numbers.length; j++) {
            if (i !== j) {
                sumArr.push(numbers[i] + numbers[j]);
            }
        }
    }
    const answer = sumArr.reduce(
        (acc,curr) => acc.includes(curr) ? acc : [...acc,curr],
        []
    );
    return answer.sort((a, b) => a - b);
}

//----------다른 풀이-----------
// 📌 배열의 중복 제거 → Set
function solution(numbers) {
    const temp = []
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            temp.push(numbers[i] + numbers[j])
        }
    }
    const answer = [...new Set(temp)]
    return answer.sort((a, b) => a - b)
}


//-----test-----
numbers = [2,1,3,4,1];
console.log(solution(numbers)); //[2,3,4,5,6,7]
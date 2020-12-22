function solution(n, words) {
    let answer = [];
    let data = [];
    for(let i = 0; i < n; i++) { data.push(new Array()); }

    const times = Math.ceil(words.length / n);
    outer: for(let i = 0; i < times; i++) {
        for(let j = 0; j < n; j++) {
            if(words[j]) {
                data[j].push(words[j]);
                const condition = isRepeated(j, data, words[j]) || !isCorrectChar(j, n, data, words[j])
                if(condition) {
                    answer.push(j+1, data[j].length);
                    break outer;
                }
            }
        }
        words.splice(0, n);
    }
    if(answer.length === 0) answer = [0, 0];
    console.log(answer);
    return answer;
}
function isCorrectChar(j, n, data, word) {
    if(j === 0) j = n;
    const idx = data[j-1].length - 1;
    if(idx === -1) return true;
    const previousChar = data[j-1][idx].substr(-1, 1);
    const nowChar = word.substr(0, 1);
    return previousChar === nowChar;
}
function isRepeated(j, data, word) {
    const copied = data.map(e => [...e]);
    copied[j].splice(-1, 1);
    const spreadData = copied.flat(1);
    return spreadData.indexOf(word) !== -1
}

// let n = 3;
// let words = ['tank', 'kick', 'know', 'wheel', 'land', 'dream', 'mother', 'robot', 'tank'];
let n = 2;
let words =  ["hello", "one", "even", "never", "now", "world", "draw"];
solution(n, words); 

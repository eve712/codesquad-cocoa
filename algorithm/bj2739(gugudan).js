//let fs = require('fs');
//let input = fs.readFileSync('/dev/stdin').toString().split(' ');

//let num = Number(input);

let result = [];
function calculate(num) {
    for(var i = 0; i < 9; i++)
        result[i] = num * (i + 1);
}

function print(num) {
    for(var i = 0; i < 9; i++){
        console.log(`${num} * ${i + 1} = ${result[i]}`);
    }
}
function main(num) {
    calculate(num);
    print(num);
}
main(num);
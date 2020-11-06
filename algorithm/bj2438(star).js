//let fs = require('fs');
//let input = fs.readFileSync('/dev/stdin').toString().split(' ');

//let num = Number(input);

result = '';

for(let i = 0; i < num; i++) {
    for(let j = 0; j <= i; j++) {
        result += "*";
    }
    result += "\n";
}

console.log(result);
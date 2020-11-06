//let fs = require('fs');
//let input = fs.readFileSync('/dev/stdin').toString().split(' ');

//input = ['1', '2', '3', '4', '5', '6', '7', '8'];
//input = ['8', '7', '6', '5', '4', '3', '2', '1'];
input = ['8', '1', '7', '2', '6', '3', '5', '4'];

function getValue(input) {
    let value = 0; 
    for (var i = 0; i < input.length - 1; i++) {
        let sub = input[i] - input[i + 1];
        if(sub < 0) 
            value++;
        if(sub > 0) 
            value--;
        }
    return value;
}
let condition = getValue(input);
if (condition === 7)
    console.log('ascending');
else if (condition === -7)
    console.log('descending');
else
    console.log('mixed');





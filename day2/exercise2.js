function factorial(n) {
    if (n === 1) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
}
function calculate(n) {
    let factorialArray = [];
    for(let i = 0; i < n; i++) {
        factorialArray.push(factorial(i + 1));
    }
    return factorialArray;
}
console.log(calculate(4)); // 1, 2, 6, 24

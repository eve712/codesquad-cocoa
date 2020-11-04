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
//----------------------------------------------

const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];

function filterId(str) {
    let result = [];
    result = str.map(item => nonWordRemv(item)); 
    while(result.indexOf(undefined) != -1) {
        result.splice(result.indexOf(undefined), 1);
    }
    result = result.map(item => numberRemv(item));
    return result;
}
function nonWordRemv (item) {
    if (/\W/.test(item) === true) {
        return;
    }
    else {
        return item;
    }
}
function numberRemv (item) {
    item = item.replace(/[0-9]/g, '');
    return item;
}

console.log(filterId(peoples));   // ['honux', 'head', 'zello', 'lucas']
//----------------------------------------------

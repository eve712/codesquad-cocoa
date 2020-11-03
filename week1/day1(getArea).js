const logFunc = [];
const logResult = [];

function saveExecution(shape, result) {
    logFunc.push(shape);
    logResult.push(result);
}

function printExecutionSequence() {
    for(var i = 0; i < logFunc.length; i++) {
        console.log("호출함수: " + logFunc[i] + ", 결과값: " + logResult[i]);
    }
}

function getArea(shape, value1, value2, value3) {
    let result;
    if (shape === 'circle') {
        if (value1 < value2) {
            result = getCircleSum(value2);
        }
        else {
            result = getCircle(value1);
        }
    }
    else if (shape === 'rect') {
        result = getRect(value1, value2);
    }
    else if (shape === 'trapezoid') {
        result = getTrape(value1, value2, value3);
    }
    console.log(result);
    saveExecution(shape, result);
}

function getCircle(radius) {
    return radius * radius * 3.14;
}

function getCircleSum(radius) {
    var result = [];
    var sum = 0;
    for(var i = 0; i < radius; i++) {
        result[i] = (i + 1) * (i + 1) * 3.14;
        sum += result[i];
    }
    return sum;
}

function getRect (width, height) {
    return width * height;
}
function getTrape (upperbase, lowerbase, height) {
    return (upperbase + lowerbase) * height / 2;
}

// 출력
console.log(
    getArea('circle', 10),
    getArea('rect', 10, 12),
    getArea('trapezoid', 10, 15, 12),
    getArea('circle', 1, 3)
);
printExecutionSequence();
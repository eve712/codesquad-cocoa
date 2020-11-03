const logFunc = [];
const logResult = [];

function logExecution(func, area) {
    logFunc.push(func);
    logResult.push(area);
}

function printExecutionSequence() {
    for(var i = 0; i < logFunc.length; i++) {
        console.log("호출함수: " + logFunc[i] + ", 결과값: " + logResult[i]);
    }
}

function getArea(shape, value1, value2, value3) {
    if (shape === 'circle') {
        if (value1 < value2) {
            getCircleSum(value2);
        }
        else {
            getCircle(value1);
        }
    }
    else if (shape === 'rect') {
        console.log(value1 * value2);
        logExecution('rect', value1 * value2);
    }
    else if (shape === 'trapezoid') {
        console.log((value1 + value2) * value3 / 2);
        logExecution('trapezoid', (value1 + value2) * value3 / 2);
    }
}

function getCircle(radius) {
    console.log(radius * radius * 3.14);
    logExecution('circle', radius * radius * 3.14);
}

function getCircleSum(radius) {
    var result = [];
    var sum = 0;
    for(var i = 0; i < radius; i++) {
        result[i] = (i + 1) * (i + 1) * 3.14;
        sum += result[i];
    }
    logExecution('circlesum', sum);
    console.log(sum);
}

// 출력
console.log(
    getArea('circle', 10),
    getArea('rect', 10, 12),
    getArea('trapezoid', 10, 15, 12),
    getArea('circle', 1, 3)
);
printExecutionSequence();
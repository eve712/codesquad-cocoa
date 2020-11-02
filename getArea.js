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

function getArea(name, a, b, c) {
    if (name === 'circle') {
        if (a < b) {
            getCircleSum(b);
        }
        else {
            getCircle(name, a);
        }
    }
    else if (name === 'rect') {
        console.log(a * b);
        logExecution('rect', a * b);
    }
    else if (name === 'trapezoid') {
        console.log((a + b) * c / 2);
        logExecution('trapezoid', (a + b) * c / 2);
    }
}

function getCircle(name, a) {
    console.log(a * a * 3.14);
    logExecution('circle', a * a * 3.14);
}

function getCircleSum(b) {
    var result = [];
    var sum = 0;
    for(var i = 0; i < b; i++) {
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
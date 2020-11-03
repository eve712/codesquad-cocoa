const execution = {
    logShape: [],
    logResult: [],
    saveExecution: function (shape, result) {
        this.logShape.push(shape);
        this.logResult.push(result);
    },
    printExecutionSequence: function() {
        for(var i = 0; i < this.logShape.length; i++) {
            console.log("호출함수: " + this.logShape[i] + ", 결과값: " + this.logResult[i]);
        }
    }
};

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
    execution.saveExecution(shape, result);
}

function getCircle(radius) {
    return radius * radius * 3.14;
}

function getCircleSum(radius) {
    let circleArr = [];
    let sum = 0;
    for(var i = 0; i < radius; i++) {
        circleArr[i] = (i + 1) * (i + 1) * 3.14;
        sum += circleArr[i];
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
execution.printExecutionSequence();
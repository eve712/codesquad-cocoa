const execution = {
    logShape: [],
    logArea: [],
    saveExecution: function (shape, area) {
        this.logShape.push(shape);
        this.logArea.push(area);
    },
    printExecutionSequence: function() {
        for(var i = 0; i < this.logShape.length; i++) {
            console.log("호출함수: " + this.logShape[i] + ", 결과값: " + this.logArea[i]);
        }
    }
};

function getArea(shape, value1, value2, value3) {
    let area;
    if (shape === 'circle') {
        if (value1 < value2) {
            area = getCircleSum(value2);
        }
        else {
            area = getCircle(value1);
        }
    }
    else if (shape === 'rect') {
        area = getRect(value1, value2);
    }
    else if (shape === 'trapezoid') {
        area = getTrape(value1, value2, value3);
    }
    console.log(area);
    execution.saveExecution(shape, area);
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
// 괄호 문법 검사기
const inspector = {
    getDataArr (string) {
        return string.split('');
    },
    braceFilter(item) {
        return item === '[' || item === ']';
    },
    braceChecker(braceArr) {
        let stack = [];
        for(let brace of braceArr) {
            let lastItem = stack[stack.length - 1];
            if(brace === '[') {
                stack.push(brace);
            }
            else {
                if(lastItem === '[') {
                    stack.pop();
                }
                else {
                    console.log('여는 괄호가 일치하지 않습니다.');
                }
            }
        }
        if (stack.length !== 0) {
            console.log('닫는 괄호가 일치하지 않습니다.');
        }
        else {
            console.log('괄호 매칭이 맞습니다!');
            return true;
        }
    }, 
    commaFilter(item) {
        return item === ',';
    },
    printInfo(string) {
        const dataArr = this.getDataArr(string);
        const braceArr = dataArr.filter(this.braceFilter);
        const commaArr = dataArr.filter(this.commaFilter);
        console.log(
            `깊이 수준은 ${braceArr.length/2}이며, 총 ${commaArr.length + 1}개의 원소가 포함되어 있습니다.`
        );
    },
    main(string) {
        const dataArr = this.getDataArr(string);
        const braceArr = dataArr.filter(this.braceFilter);
        if (this.braceChecker(braceArr)) {
            this.printInfo(string);
        }
    }
};

//---------------------------
// 3번 - 배열 분석 정보 출력

// 1. 괄호, 숫자만 걸러서 배열로 만들기
// 2. 위 배열을 앞에서부터 하나씩 참조
// 3. '[' 여는 괄호일 때 
//      → shift로 첫 번째 원소 제거, new Node("array"), child에 push, 재귀로 반복!
//      → 재귀로 반복할 때 새로 생성한 객체를 인자로 넣어서 반복해야 함. 
// 4. ']' 닫는 괄호일 때
//      → shift, 재귀로 반복 
// 5. 숫자 일 때 
//      → shift, new Node("number", value), child에 push, 재귀로 반복
// 6. 모두 shift해서 배열의 길이가 0이면 종료.

class Node {
    constructor(type = "root", value) {
        this.type = type;
        this.value = value;
        this.child = [];
    }
    braceNumFilter(item) {
        return item === '[' || item === ']' || 
            (typeof parseInt(item) === 'number' && isFinite(parseInt(item)) );
    }
    // 괄호, 숫자만 있는 배열 반환
    getPureArr(string) {
        let dataArr = inspector.getDataArr(string);
        return dataArr.filter(this.braceNumFilter);
    }
    // 배열 정보 분석해주는 함수
    getNode(pureArr, node) {
        let currItem = pureArr[0];
        if(currItem === '[') {
            pureArr.shift();
            let arrNode = new Node("array");
            node.child.push(arrNode);
            this.getNode(pureArr, arrNode);
        }
        else if(currItem === ']') {
            pureArr.shift();
            this.getNode(pureArr, node);
        }
        else if(pureArr.length === 0) {
            return;
        }
        else {
            pureArr.shift();
            let numNode = new Node("number", currItem);
            node.child.push(numNode);
            this.getNode(pureArr, node);
        }
        return node;
    }
    // 분석한 것을 콘솔에 출력
    main (string, node) {
        let pureArr = this.getPureArr(string);   
        let arrayInfo = this.getNode(pureArr, node);
        let print = JSON.stringify(arrayInfo, null, '\t');
        console.log(print);
    }
}

//--------------/test/---------------
const data_1 = "[1, 2, [3]]";
let node = new Node();
node.main(data_1, node);

const data_2 = "[1, [2], 3]";
//다시 윗 단계로 빠질 때는 어떻게 해야 될까...


//--------------/test/---------------
const data = "[1, 2, [3]]";
inspector.main(data);

console.log("---------------");

const data2 = "[1,2,[3,4,[5,[6]]";
inspector.main(data2);
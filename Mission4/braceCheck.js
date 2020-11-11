// 문자열을 배열로 쪼개는 함수
function getDataArr (data) {
    return data.split('');
}

// 괄호만 남기는 함수 (bool값 반환)
function braceFilter(item) {
    return item === '[' || item === ']';
}

// 괄호 오류 체크하는 함수
function braceChecker(braceArr) {
    let stack = [];
    for(let brace of braceArr) {
        let lastItem = stack[stack.length - 1];
        if(brace === '[') {
            stack.push(brace);
        }
        // if(braceArr[0] === ']') 여러 괄호를 검사하려면 else if 아니면 switch
        else {
            if(lastItem === '[') {
                stack.pop();
            }
            else {
                return console.log('여는 괄호가 일치하지 않습니다.');
            }
        }
    }
    if (stack.length !== 0) {
        console.log('닫는 괄호가 일치하지 않습니다.');
    }
    else {
        console.log('괄호 매칭이 맞습니다!');
    }
} 

// 컴마 수로 원소 개수 세기
/*
function commaFilter(item) {
    return item === ',';
}
let commaArr = dataArr.filter(commaFilter);
let numberOfItem = commaArr.length + 1;
*/

// 오류 체크 함수
function main(string) {
    let dataArr = getDataArr(string);
    let braceArr = dataArr.filter(braceFilter);
    braceChecker(braceArr);
}



//----------------
const data = "[1, 2, [[3]]";
main(data);


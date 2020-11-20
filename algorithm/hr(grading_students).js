'use strict';
/*
 * Complete the 'gradingStudents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY grades as parameter.
 */

// ●●첫 번째. 조건이 너무 많고 하드코딩.
/*
function gradingStudents(grades) {
    const stringOfGrade = grades.toString();
    const notRounding = grades < 38 || 
        stringOfGrade.length === 3 ||
        stringOfGrade[1] === 0 ||
        ...
        ...  조건 너무 많음. 가독성도 떨어짐.   
    if (notRounding) {
        return grades;
    } else {
        
    }
}
*/

// 일일이 조건을 나열하지 않고, 반복문 사용 최소로 다시 코드 짜보기.
// ●●두 번째. 차이를 계산해서 조건을 주도록. 

// 5의 배수를 배열에 담아서 사용
const multipleOfFive = [];
for (let i = 40; i <= 100; i += 5){
    multipleOfFive.push(i);
}

// grade값보다 크면서 최소값 반환
function getMinMultiple(grade) {
    return multipleOfFive.find(el => el > grade);
}

function gradingStudents(grades) {
    let closestMultiple;
    const result = grades.map(grade => {
        closestMultiple = getMinMultiple(grade);
        if(grade < 38) return grade;
        else if(closestMultiple - grade < 3) return closestMultiple;
        else return grade;
    });
    return result;
}

// -----------test------------
const grades = [35, 45, 38, 78, 91, 86]; 
console.log(gradingStudents(grades)); //[ 35, 45, 40, 80, 91, 86 ]
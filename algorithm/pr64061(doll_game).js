function solution (board, moves) {
    const basket = [];
    let stack = [];
    let answer = 0;
    for (let i = 0; i < moves.length; i++) {
        let index = moves[i] - 1;
        for (let line of board) {
            if(line[index] !== 0) {
                basket.push(line[index]);
                line.splice(index, 1, 0);
                break;
            }
        }
    }
    for (let doll of basket) {
        if(stack[stack.length - 1] !== doll) {
            stack.push(doll);
        }
        else {
            stack.pop();
            answer += 2;
        }
    }
    return answer;
}

//----------다른 풀이-----------

// 📌 reduce, map, spread operator
// 📌 행으로 되어있던 board를 크레인위치에 따라 열로 바꿔주는 함수
// 'result'가 accumulator, 'row'가 board의 원소(배열)
// result[0] = board의 각 원소(배열)들의 row[0]
// result[1] = board의 각 원소(배열)들의 row[1]
// 따라서 result = 
// [[0, 0, 0, 4, 3]  → 첫번째 열(moves 1)
//  [0, 0, 2, 2, 5]  → 두번째 열(moves 2)
//  [0, 1, 5, 4, 1]  → 세번째 열(moves 3)
//  [0, 0, 0, 4, 3]  → 네번째 열(moves 4)
//  [0, 3, 1, 2, 1]]  → 다섯번째 열(moves 5)
// 즉, moves 값이 1이면 result[0]을 참조하면 됨. → moves의 원소들을 인덱스로 활용할 수 있다.
const transpose = matrix =>
    matrix.reduce(
        (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
        []
    );

const solution = (board, moves) => {
    // reverse : 나중에 마지막 원소를 삭제하는 pop을 하기 위해서 순서를 바꿔줌
    // filter : 0 제거
    // stacks = [[3, 4], [5, 2, 2], [1, 4, 5, 1], [3, 4], [1, 2, 1, 3]]
    const stacks = transpose(board).map(row =>
        row.reverse().filter(el => el !== 0)
    );

    const basket = [];
    let result = 0;

    // moves의 원소들을 인덱스로 활용
    // pop = 뽑을 크레인 위치
    // if (pop이 빈배열이면) continue;
    // if (basket마지막 원소랑 같으면) basket.pop(); result += 2;
    // else basket.push(pop);
    for (const move of moves) {
        const pop = stacks[move - 1].pop();
        if (!pop) continue;
        if (pop === basket[basket.length - 1]) {
            basket.pop();
            result += 2;
            continue;
        }
        basket.push(pop);
    }

    return result;
};


//-----test-----
board = [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]];
moves = [1,5,3,5,1,2,1,4];
console.log(solution(board, moves)); // 4
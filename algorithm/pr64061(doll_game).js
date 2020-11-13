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

board = [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]];
moves = [1,5,3,5,1,2,1,4];
console.log(solution(board, moves)); // 4
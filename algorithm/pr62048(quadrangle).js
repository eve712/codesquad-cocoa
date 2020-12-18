//pr62048(quadrangle)
// 정사각형이면 w * w - w;
// 직사각형이면 w * h - (작은변 x 기울기올림)
function solution(w, h) {
    var answer = 1;
    if(w === h) answer = (w * w) - w;
    else {
        const gradient = (h / w) < 1 ? (w / h) : (h / w);
        const smaller = w < h ? w : h;
        const num = Math.ceil(gradient);
        answer = w * h - (smaller * num);
    }
    return answer;
}

console.log(solution(8, 12));
console.log(solution(3, 3));
console.log(solution(4, 5));
console.log(solution(7, 3));
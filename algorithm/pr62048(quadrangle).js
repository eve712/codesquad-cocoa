// 정사각형이면 w * w - w;
// 직사각형이면 w * h - (작은변 x 기울기올림)
function solution(w, h) {
    var answer = 1;
    if(w === h) answer = (w * w) - w;
    else {
        const gradient = (h / w) < 1 ? (w / h) : (h / w);
        const smaller = w < h ? w : h;
        const num = parseInt(gradient) + 1;
        answer = w * h - (smaller * num);
    }
    return answer;
}
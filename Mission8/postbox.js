
// 1. 마을의 개수
// 2. child를 가질 마을 개수
// 3. child를 가질 마을을 선택(idx), 마을의 개수(2)만큼 반복
// 4. townRelation[idx]의 child에 새로운 노드를 생성해서 push

// ----------------------------------------

// node 객체를 만드는 생성자
const CreateNode = function (name, value) {
    this.name = name;
    this.postbox = value;
    this.child = [];
}

// 마을을 생성하고, 마을에 대한 정보를 데이터로 보관
class TownModel {
    constructor() {
        this.townRelation = [];
        this.indexes = [];
        this.numOfFirst;
        this.numOfHavingChild;
    }
    // 마을을 새로운 노드로 만드는 함수
    createTown () {
        // name, value값을 정해줘야함
        let newTown = new CreateNode();
    }
    // 1~max까지 랜덤으로 정수 반환
    getRandomNum (min, max) {
        const random = Math.floor(Math.random() * max) + min;
        return random;
    }

    // 1차 마을의 개수, child를 가질 마을의 개수
    decideNum() {
        this.numOfFirst = this.getRandomNum(1, 5);
        this.numOfHavingChild = this.getRandomNum(0, 5);
    }
    // chlid를 가질 마을 선택(idx 정하기)
    // n = this.numOfHavingChild 뽑아야할 idx 개수
    // length = 현재 진행중인 배열의 원소 개수
    // clear = 인덱스 모아둔 배열 초기화 여부
    selectIdx(n, length, clear = true) {
        if(clear) this.indexes = [];
        let result = this.indexes;
        for(let i = 0; i < n; i++) {
            let idx = this.getRandomNum(0, length - 1);
            if(result.length < n && result.indexOf(idx) < 0) {
                result.push(idx);
            }   
        }
        if(result.length === n) {
            this.indexes = result;
            return result;
        }
        else this.selectIdx(n - result.length, length, false);
    }



}

// 생성한 마을들을 DOM 요소로 구현
class TownView {

}

//  마을의 개수 정하기
//  name > random()으로 52개 알파벳 중 하나 랜덤 지정.
//   → 중복되면 다시 이름 정하기(재귀)
//  postbox > random()으로 확률 지정해서 bool값 반환하도록.
//  마을의 개수만큼 CreatNode로 만들고 allTown 배열에 넣기

//  child를 가질 마을 개수
//  child를 가질 마을을 선택(idx), 마을의 개수만큼 반복
//  allTown[idx]의 child에 새로운 노드를 생성해서 push

// ----------------------------------------

// node 객체를 만드는 생성자
const CreateNode = function (name, value) {
    this.name = name;
    this.postbox = value;
    this.child = [];
}

// ----------------------------------------

// 마을을 생성하고, 마을에 대한 정보를 데이터로 보관
class createTown {
    constructor() {
        this.allTown = [];
        this.indexes = [];
        this.usedName = [];
        this.numOfTown;
        this.numOfHavingChild;
    }
    // min ~ max까지 랜덤으로 정수 반환
    getRandomNum (min, max) {
        const random = Math.floor(Math.random() * max) + min;
        return random;
    }
    // 마을의 이름 랜덤으로 정하는 함수, 중복이면 다시 정하기
    // ●●● 최대 개수가 52개라는 한계 → 무한이 아님!!
    createName () {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const idx1 = this.getRandomNum(0, alphabet.length - 1); // 다른 값
        const idx2 = this.getRandomNum(0, alphabet.length - 1); // 다른 값 할당
        const name = alphabet.charAt(idx1) + alphabet.charAt(idx2);
        if(this.usedName.indexOf(name) < 0) {
            this.usedName.push(name);
            return name;
        }
        else this.createName();
    }
    // 40% postbox true
    createPostbox() {
        let num = Math.random();
        if(num >= 0.6) return true;
        else return false;
    }
    // 마을을 새로운 노드로 만드는 함수
    createTown (n) {
        let arr = [];
        for(let i = 0; i < n; i++) {
            let name = this.createName();
            let postbox = this.createPostbox();
            let newTown = new CreateNode(name, postbox);
            arr.push(newTown);
        }
        return arr;
    }
    // 마을의 개수, child를 가질 마을의 개수
    decideNum(max) {
        this.numOfTown = this.getRandomNum(1, max);
        this.numOfHavingChild = this.getRandomNum(0, this.numOfTown);
    }
    // chlid를 가질 마을 선택(idx 정하기)
    // n = this.numOfHavingChild 뽑아야할 idx 개수
    // length = 현재 진행중인 배열의 원소 개수
    // clear = 인덱스 모아둔 배열 초기화 여부
    selectIdx(n, length, clear = true) {
        if(clear) this.indexes = [];
        let result = this.indexes;
        let max = (length > 1) ? length - 1 : length;
        for(let i = 0; i < n; i++) {
            let idx = this.getRandomNum(0, max);
            if(result.length < n && result.indexOf(idx) < 0) {
                result.push(idx);
            }   
        }
        if(result.length === n) {
            this.indexes = result;
        }
        else {
            this.selectIdx(n, length, false);
        }
    }
    // n개 이하로 마을 생성, 마을 노드가 들어있는 배열 반환
    getTownsArr(n) {
        this.decideNum(n); // n개 이하로 마을 개수 랜덤 돌리기
        this.selectIdx(this.numOfHavingChild, this.numOfTown); // 자식을 가질 idx 뽑아 this.indexes
        const newTownsArr = this.createTown(this.numOfTown); // 마을 개수만큼 노드 만들어 배열로 반환
        return newTownsArr;
    }
    pushFirstTown(n) {
        const newTownArr = this.getTownsArr(n);
        this.allTown = [...newTownArr];
    }
    // 부모 마을의 자식 형제는 n개 이하로..
    createChildTown(n, parentArr) {
        let newChildArr;
        if(this.indexes.length > 0) {
            this.indexes.forEach(idx => {
                newChildArr = this.getTownsArr(n);
                parentArr[idx].child.push(...newChildArr);
                this.createChildTown(n, parentArr[idx].child);
            });
        }
    }
    main(firstTown, childTown) {
        this.pushFirstTown(firstTown); // 1차 마을 allTown배열에 push
        this.createChildTown(childTown, this.allTown); // 자식마을 2개 이하
        console.log(this.allTown);
    }
}

// 생성한 마을들을 DOM 요소로 구현
class ViewTown {

    createEl(arr, parentEl) {
        for(let i = 0; i < arr.length; i++) {
            let el = document.createElement('div');
            el.innerText = arr[i].name;
            parentEl.appendChild(el);
            if(arr[i].postbox) el.classList.add('postbox');
        }
    }

}

//------------test--------------
let town = new createTown();
town.main(6,2);
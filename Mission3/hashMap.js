class HashMap {
    constructor() {
        this.tableSize = 41;
        this.map = [];
        this.count = 0;
        this.keys = [];
    }

    // 문자열을 정수로 해싱해주는 방법 중 어떤 것이 좋은 방법인지 모르겠음
    getValue(str) {
        let value = 0;
        for (let i of str) {
            value += str.charCodeAt(i);
        }
        return value;
    }
    
    // 인덱스 구하는 해시 함수
    getHash(str) {
        return this.getValue(str) % this.tableSize;
    }

    // 이중 해시 함수
    getStepHash(str) {
        let value = this.getValue(str);
        return 37 - (value % 37);
    }

    put(key, value) {
        let index = this.getHash(key);
        let targetValue = this.map[index];
        while (true) {
            // map[index]가 비어있다면
            if (!targetValue) {
                this.map[index] = {[key]: value};
                console.log(`${index}번 인덱스에 ${key} 저장!`);
                this.count++;
                this.keys.push(key);
                return;
            }
            // map 배열에 빈 인덱스가 없으면
            else if (this.map.length >= this.tableSize) {
                console.log(`해시맵이 다 찼습니다.`);
                return;
            }
            // 충돌하면 이중 해싱으로 인덱스 바꿔주기
            else {
                console.log(`${index}번 인덱스에 ${key} 저장하려다 충돌 발생`);
                index += this.getStepHash(key);
                index = index > this.tableSize ? index - this.tableSize : index;
                targetValue = this.map[index];
            }
        }
    }

    // 전체 아이템 개수 리턴
    size() {
        return this.count;
    }

    // 전체 키 목록을 [string] 배열로 리턴
    getKeys() {
        return this.keys;
    }

    // 해당 키가 존재하는지 boolean값
    containsKey(key) {
        if (this.getKeys().indexOf(key) !== -1) {
            return true;
        }
        return false;
    }



    // 이 밑은 다시 해야 됨
    //-----------------------------------------------------
    // 값을 다시 찾아올 때 for문을 돌리면 해시맵으로서의 장점이 사라지는데 방법을 모르겠음
    // ➔ 수업, 다른 분들 코드보기
    
    // 해당 키의 속성값 리턴
    // 수정해야함
    get(key) {
        let arr = this.map.filter(this.filterEmpty);
        for(let item of arr) {
            if(Object.keys(item)[0] === key) {
                return item[key];
            }
        }
    }
    filterEmpty(item) {
        if (item !== undefined) return true;
    }

    // 해당 키를 가진 map 배열의 index 리턴
    getIndex(key) {
        for(let i = 0; i < this.map.length; i++) {
            if(this.map[i][key]) {
                return i;
            }
        }
        return  -1;
    }

    // 해당 키 값 삭제 = 해당 키가 있는 index를 찾아서 this.map[index] 원소 삭제 splice
    remove(key) {
        let index = this.getIndex(key);
        this.map.splice(index, 1);
        this.count--;
        let idx = this.keys.indexOf(key);
        if (idx > -1) this.keys.splice(idx, 1);
    }

    // 키-값으로 기존 값을 대체
    replace(key, value) {

    }

    // 비어있는 맵인지 boolean값
    isEmpty() {

    }

    // 전체 맵 초기화
    clear() {

    }
}

let myHashMap = new HashMap();
myHashMap.put('me', 'eve');
myHashMap.put('class1', 'frontend');
myHashMap.put('class2', 'backend');
myHashMap.put('teacher', 'crong');
myHashMap.put('pet', 'taengja');
myHashMap.put('want', 'sleep');
console.log(myHashMap.map);
console.log(myHashMap.size());
console.log(myHashMap.getKeys()); 
console.log(myHashMap.containsKey('me'));   // true
console.log(myHashMap.containsKey('mola')); // false
myHashMap.get('want');
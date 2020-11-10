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

    // 해당 키의 속성값 리턴
    get(key) {
        let index = this.getHash(key);
        while(true) {
            if(this.map[index] === undefined) {
                console.log(`${key}는 저장되지 않은 key입니다.`);
                return;
            }
            else if(Object.keys(this.map[index])[0] === key) {
                return this.map[index][key];
            }
            else {
                index += this.getStepHash(key);
                index = index > this.tableSize ? index - this.tableSize : index;
            }
        }   
    }

    // 해당 키 삭제
    remove(key) {
        let index = this.getHash(key);
        while(true) {
            if(this.map[index] === undefined) {
                console.log(`${key}는 저장되지 않은 key입니다.`);
                return;
            }
            else if(Object.keys(this.map[index])[0] === key) {
                delete this.map[index];
                this.count--;
                let idx = this.keys.indexOf(key);
                if (idx > -1) this.keys.splice(idx, 1);
                return index;
            }
            else {
                index += this.getStepHash(key);
                index = index > this.tableSize ? index - this.tableSize : index;
            }
        } 
    }

    // key에 새로운 value로 변경
    replace(key, value) {
        let index = this.remove(key);
        if (index === undefined) {
            console.log(`대체할 기존 값이 없습니다.`);
        }
        else {
            let item = {[key] : value};
            // 원하는 인덱스에 원소 밀어넣기
            this.map.splice(index, 0, item);
        }
    }

    // 전체 맵 초기화
    clear() {
        this.map = [];
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
console.log(myHashMap.containsKey('me'));   // true
console.log(myHashMap.containsKey('mola')); // false
console.log(myHashMap.get('me')); // eve
myHashMap.remove('class2');
myHashMap.replace('want', 'coffee');
console.log(myHashMap.map);

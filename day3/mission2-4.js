const o = require('./o.js');
let numberkey = [];

function getNumberKey(obj) {
    for(var key in obj) {
        // let dataValue = obj.key;
        // key의 자료형은 string이기 때문에!! 
        // obj.key는 o.data.'window'가 되기 때문에 접근법이 잘못돼서 undefined이다.
        // 따라서, obj.key가 아니라 obj[key]로 접근해야 속성값에 접근할 수 있다.
        let dataValue = obj[key];
        if(typeof dataValue === "number") {
            numberkey.push(key);
        }
        else if (typeof dataValue === "object") {
            getNumberKey(dataValue);
        }
    }
    return numberkey;
}
console.log(getNumberKey(o.data));
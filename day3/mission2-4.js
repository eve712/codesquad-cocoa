

const o = require('./o.js');
let numberkey = [];

function getNumberKey(obj) {
    for(var key in obj) {
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



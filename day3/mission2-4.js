const o = require('./o.js');

let numberkey = [];

function getNumberKey(obj) {
    for(var key in obj) {
        if(typeof obj[key] === "number") 
            numberkey.push(key);
        else if (typeof obj[key] === "object") 
            getNumberKey(obj[key]);
    }
    return numberkey;
}

console.log(getNumberKey(o.data));



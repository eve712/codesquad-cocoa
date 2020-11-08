const jsonTree = require('./json_tree.js');
// lisasu 코드
let nameSk = [];

function getNameSk(data) {
    for(var i in data) {
        if(data[i].type === "sk")
            nameSk.push(data[i].name);
        if(data[i].childnode.length !== 0) 
            getNameSk(data[i].childnode);
    }
    return nameSk;
}
console.log(getNameSk(jsonTree.data));

// 
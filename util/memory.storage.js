const MemoryStorage = require("memorystorage");
const store = new MemoryStorage("students");

exports.getKeys = (store) => {
    var keys =[];
    for (var i = 0 ; i < store.length ; i++){
        var key = store.key(i);
        keys.push(key);
    }
    return keys ;
}

exports.getValues = (store) => {
    var values =[];
    for (var i = 0 ; i < store.length ; i++){
        var key = store.key(i);
        var values = store.getItem(key);
        values.push(key);
    }
    return values ;
}



module.exports = store 
const path = require('path');
const fs = require('fs');

module.exports = function (filePath){
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
}

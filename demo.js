let bcrypt = require('bcryptjs')

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("12345", salt)

console.log(hash)

/* console.log(bcrypt.compareSync("abdce", hash)); // true
console.log(bcrypt.compareSync("123456", hash)); // fals */
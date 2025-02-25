var eventos = require("./config")

var x = EventSource.greet

obj1 = {
    name : "Jane Doe",
    age : 21,
    gender : "Female"
}

str1 = JSON.stringify(obj1);
// console.log(str1);

str2 = '{"name" : "Jane Doe","age" : 21,"gender" : "Female"}'

obj2 = JSON.parse(str2);
console.log(obj2);





class Person {
    constructor(firstname,lastname) {
        this.firstname = firstname;
        this.lastname = lastname;

    }

}

Person.prototype.age = 21

Person.prototype.greet = function() {
    return "Hello " + this.firstname + " " + this.lastname + "; age:" + this.age
}



var jane = new Person("Jane","Doe")
var john = new Person("John","Doe")

console.log(jane)
console.log(jane.greet())

console.log(jane.__proto__)
console.log(john.__proto__)
console.log(jane.__proto__ == john.__proto__)
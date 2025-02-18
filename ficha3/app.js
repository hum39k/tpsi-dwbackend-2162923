function start(){

    console.log("Download started");
   
}

function update(){

    for(let i = 0; i<=100;i++){
        console.log(i + "% of Download");
       
    }
}

function complete(){

    console.log("Download complete");
}

function performDownload(start,update,complete){

    start();
    update();
    complete();

}

// performDownload(start,update,complete);


var ArrayUtils = require("./ArrayUtils.js")

abc = [1,5,7,2,0]
a1 = []
array = [7,4,"hi",21]

var isEmpty = ArrayUtils.isEmpty(a1)
var maximo = ArrayUtils.max(abc)
var minimo = ArrayUtils.min(abc)
var avrg = ArrayUtils.average(abc)
var index = ArrayUtils.indexOf(abc,2)
var sub = ArrayUtils.subarray(abc,1,3)
var SameLength = ArrayUtils.isSameLength(abc,array)
var reversed = ArrayUtils.reverse(abc)
var swaped = ArrayUtils.swap(abc,2,4)
var contain = ArrayUtils.contains(25,abc)
var concatenated = ArrayUtils.concatenate(abc,array)




console.log(reversed)

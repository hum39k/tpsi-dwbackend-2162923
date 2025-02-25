abc = []
abc.push(function(){
        console.log("Hello World 1");
},
    function(){
        console.log("Hello World 2");
},
    function(){
        console.log("Hello World 3");
        }
)

// for (let i = 0; i < abc.length; i++)
//     abc[i]();

abc.forEach(element => {
    element()
});

    
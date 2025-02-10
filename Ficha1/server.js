

 function calculategrade(p1,p2,freq){
    
    var nota = (p1 * 0.3) + (p2 * 0.4) + (freq * 0.3)
    console.log("A nota final é: " + nota)
    
    
    if (nota >= 9.5) {
        console.log("Aluno aprovado");
    }
    else
        console.log("Aluno não aprovado");

    console.log("")

}

// calculategrade(12,10,5)
// calculategrade(2,15,15)
// calculategrade(12,15,16)
// calculategrade(20,19,19)


/*asd
comentario 
asd*/


function data(num){

    switch (num){
        case 1:
            console.log("Janeiro");
        case 2:
            console.log("Fevereiro");    
        case 3:
            console.log("Março");
        case 4:
            console.log("Abril");
        case 5:
            console.log("Maio");
        case 6:
            console.log("Junho");
        case 7:
            console.log("Julho");
        case 8:
            console.log("Agosto");
        case 9:
            console.log("Setembro");
        case 10:
            console.log("Outubro");       
        case 11:
            console.log("Novembro");
        case 12:
            console.log("Dezembro");
        }
}

// data(1)



function operacao(n1,n2,op){

    if (op == "+")
        return n1 + n2
    else if (op == "-")
        return n1 - n2  
    else if (op == "*")
        return n1 * n2
    else if (op == "/")
        return n1 / n2         
}


// console.log(operacao(7,2,"*"))

function multiple(num,max){
    
    for (var i =1; i < max; i++){
        
        if (i % num == 0)
            console.log(i) 
    }
}

// multiple(5,20)


function soma(n){
    var res = 1;

    for(var i =2; i <= n; i++){
        res+=i;
    }

    return res;
}

// console.log(soma(5));

function fatorial(n){
    var res = 1;

    for(var i =n; i >=1; i--){
        res*=i;
    }

    return res;
}

// console.log(fatorial(5))


function max(list){
    var nmax = list[0];
    for(let i = 1; i < list.length; i++){
        if (list[i] > nmax)
            nmax = list[i]
    }
    return nmax
}

function min(list){
    var nmin = list[0];
    for(let i = 1; i<list.length; i++){
        if (list[i] < nmin)
            nmin = list[i]
    }
    return nmin
}

function media(list){
    var res = 0;
   
    for(let i=0; i < list.length; i++){
        res+= list[i];
    }
    med = res / list.length;
    return med;
}

console.log(min([15,3,75,2,11]));



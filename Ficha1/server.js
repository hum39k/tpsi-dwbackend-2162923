

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

calculategrade(12,10,5)
calculategrade(2,15,15)
calculategrade(12,15,16)
calculategrade(20,19,19)


/*asd
asdas
asda*/

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
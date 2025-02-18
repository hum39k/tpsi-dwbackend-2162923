function imc(peso,altura){
    var imc = peso/ Math.pow(altura,2);
    console.log(imc)
    if (imc < 18.5)
        console.log("Abaixo do peso");
    else if(imc >=18,5 && imc < 25)
        console.log("No peso normal");
    else if (imc >= 25 && imc < 30)
        console.log("Acima do peso");
    else if (imc >= 30)
        console.log("Obeso");
}

// imc(80,1.85);

function invert(str){
    var splitted = str.split(" ");
    var reverse = ""
    for(let i = 0; i < splitted.length ; i++){
        for (let j = splitted[i].length -1; j >= 0; j--)
            reverse+=splitted[i][j]
        reverse+=" ";
    }
    return reverse;
}

// console.log(invert("Hoje e domingo"));


function countvowel(str){
    var count = 0;
    for (let i =0; i<= str.length - 1; i++){
        if (str[i].toLowerCase() == "a" || str[i].toLowerCase() =="e" || str[i].toLowerCase() == "i" || str[i].toLowerCase() == "o" || str[i].toLowerCase() == "u") 
            count+=1;
    }
    return count;
}

// console.log(countvowel("Hoje e domingO"));

function countletter(str,letra){
    str = str.toLowerCase();
    var count = 0;
    letra = letra.toLowerCase();
    for (let i = 0; i <= str.length - 1; i++){
        if (str[i] == letra)
            count+=1;
    }
    return count;
}

// console.log(countletter("Hoje e domingo","o"));


function drawRectangle(altura,largura){
    var width = ""
    for(let i = 1; i <= largura; i++){
        width+= "*"
    }
    for(let i = 1; i<= altura; i++)
        console.log(width)
}


// drawRectangle(4,15)

function drawTriangle(altura){
    var line = "";
    for (let i = 0; i < altura; i++){
        line += "*";
        console.log(line);
    }
        
}


// drawTriangle(5);

function drawBox(altura, largura){
    
    for (let i = 0; i < altura; i++){
        count="";

        for (let j = 0; j<largura; j++){
            if(i == 0 || i== altura - 1 || j == 0 || j == largura -1)
            count+="*";
            else
                count+= " ";
        }
        console.log(count)
    }

}

drawBox(5,7);

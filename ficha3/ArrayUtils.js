var ArrayUtils = {

    isEmpty : function(array){
        return array.length == 0;
    },

    max : function(array){

        nmax = array[0];
        for(let i = 1; i<= array.length - 1; i++)
            if (array[i] > nmax)
                nmax = array[i];
        return nmax;
    },
    
    min : function(array){
    
    nmin = array[0];
    for(let i = 1; i<= array.length - 1; i++)
        if (array[i] < nmin)
            nmin = array[i];
    return nmin;
    },

    average : function(array){
        var total = 0;
        for (let i = 0; i<= array.length - 1; i++)
            total += array[i];

        var media = total / array.length
        return media;
    },

    indexOf : function(array,value){
        for (let i = 0; i <= array.length - 1; i++){
            if (array[i] == value)
                return i;
        }
        return -1;
    },

    subarray : function(array, start, end){
        var temp=[];
        for(let i = start; i<= end; i++){
            temp.push(array[i]);
        }
        return temp;
    },

    isSameLength : function(a1,a2){
        
        return a1.length == a2.length;
        
    },

    reverse : function(array){
        var temp=[];
        for(let i = array.length - 1; i>= 0; i--)
            temp.push(array[i]);        
        
        return temp;
    },
    
    swap : function(array,i1,i2){
        
        var temp = array[i1];
        array[i1] = array[i2];
        array[i2] = temp; 

        return array;
    },

    contains : function(array, value){
        
        return this.indexOf(array,value) != -1;    
    },

    concatenate : function(a1,a2){
        var temp = [];
        for (let i = 0; i <= a1.length; i++)
            temp.push(a1[i]);
        for (let i = 0; i <= a2.length; i++)
            temp.push(a2[i]);
        return temp; 
    },
}

module.exports = ArrayUtils
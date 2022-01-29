// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB


function getStats(txt) {
    // you need to write your own code here

    var chars = 0 
    // for (let char in txt){
    //     chars+=1;
    // }
    let strArr = txt.split('');
    strArr.forEach(function(){
        chars+=1;
    });
   
   

    return {
        nChars: chars,                                                     
        nWords: 22,
        nLines: 10,
        nNonEmptyLines: 22,
        averageWordLength: 3.3,
        maxLineLength: 33,
        tenLongestWords: ["xxxxxxxxx", "123444444"],
        tenMostFrequentWords: ["a", "this", "the"]
    };

}



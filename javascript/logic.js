// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB


function getStats(txt) {
    // you need to write your own code here

    function aasciCode(item){
        let aasciCode = item.charCodeAt(0);
        console.log(aasciCode);
    }

    //Basic logic to count number of characters
    let chars = 0 
    let strArr = txt.split('');
    strArr.forEach(function(){chars+=1;});
   
    // Basic logic to count the number of lines
    let numLines = 0;
    let linesArr = txt == "" ? [] : txt.split('\n');
    console.log(linesArr);
    linesArr.forEach(function(){numLines+=1;})

    console.log(linesArr);



   

    return {
        nChars: chars,                                                     
        nWords: 22,
        nLines: numLines,
        nNonEmptyLines: 22,
        averageWordLength: 3.3,
        maxLineLength: 33,
        tenLongestWords: ["xxxxxxxxx", "123444444"],
        tenMostFrequentWords: ["a", "this", "the"]
    };

}

getStats("hello");
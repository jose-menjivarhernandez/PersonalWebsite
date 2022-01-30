// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB


function getStats(txt) {
    // you need to write your own code here

    //Basic logic to count number of characters
    let chars = 0;
    let strArr = txt.split('');
    console.log(strArr)
    strArr.forEach(function(){chars+=1;});
   
    // Basic logic to count the number of lines
    let numLines = 0;
    let linesArr = txt == "" ? [] : txt.split('\n');
    linesArr.forEach(function(){numLines+=1;});

    // Basic logic to count non empty lines
    let nonEmptyLines = 0;
    for (let line of linesArr){
        let charArr = line.split('');
        for (let character of charArr){
            if(character.charCodeAt(0) > 32){
                nonEmptyLines+=1;
                break;
            }
        } 
    }

    function checkMap(word, map){
        if (typeof map.get(word) != "undefined"){
            let value = map.get(word);
            map.set(word, value+=1); 
        } 
        else{
            map.set(word,1);
        } 
    }

    function isNumeric(char){
        let code = char.charCodeAt(0);
        if(code > 47 && code < 58){
            return true;
        }
        else{
            return false;
        }
    }
    
    function removePunctuation(word){
        let punctuationRegex = /[,.?!]/g;
        let newWord = word.replace(punctuationRegex, '');
        return newWord;        
    }

    const wordMap = new Map();
    let wordCount = 0;

    let word = "";    
    for(let character of strArr){
        let code = character.charCodeAt(0);
        if(character != ' ' && character != '\n' && (code > 32 && !isNumeric(character))){
            word = word + character;
        }
        else{
            let pWord = removePunctuation(word);
            checkMap(pWord, wordMap);
            wordCount +=1;
            word = "";
            word = isNumeric(character) ? (word + character) : word;
        }
    }
    wordCount+=1;
    let finalWord = removePunctuation(word);
    checkMap(finalWord, wordMap);
   
    console.log(wordMap);
    return {
        nChars: chars,                                                     
        nWords: wordCount,
        nLines: numLines,
        nNonEmptyLines: nonEmptyLines,
        averageWordLength: 3.3,
        maxLineLength: 33,
        tenLongestWords: ["xxxxxxxxx", "123444444"],
        tenMostFrequentWords: ["a", "this", "the"],
    };

}

console.log(getStats("hello\nguys guys"));

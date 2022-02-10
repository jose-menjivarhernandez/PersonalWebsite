// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB


function getStats(txt) {
    // you need to write your own code here

    //Basic logic to count number of characters
    let chars = 0;
    let strArr = txt.split('');
    strArr.forEach(function(){chars+=1;});
   
    // Basic logic to count the number of lines
    let numLines = 0;
    let linesArr = txt == "" ? [] : txt.split('\n');
    console.log(linesArr);
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


    //******************************* Utility functions **************************************/
    function checkMap(word, map){
        let char = word.charAt(0);
        if (word != "" && !isSeparator(word) && (isNumeric(char) || isAlphabetical(char))){
            if (typeof map.get(word) != "undefined"){
                let value = map.get(word);
                map.set(word, value+=1); 
            } 
            else{
                map.set(word,1);
            }
            // console.log(word);
            wordCount+=1;
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

    function isAlphabetical(char){
        let code = char.charCodeAt(0);
        if((code >= 65 && code <= 90) || (code >= 97 && code <= 122)){
            return true;
        }
        else{
            return false;
        }

    }

    function isSeparator(char){
        if(char === ' ' || char === '\n'){
            return true;
        }
        else{
            return false;
        }
    }
    
    function removePunctuation(word){
        let punctuationRegex = /[;,.?!"+-]/g;
        let newWord = word.replace(punctuationRegex, '');
        return newWord;        
    }

    function tieBraker(a, b){
        // Since we are assuming that both a and b are length 2 arrays with a KV pair
        if(a[1] == b[1]){
            return a[0] > b[0] ? 1: -1;
        }
        else{
            return b[1] -a[1]; 
        }
    }


    function findMaxLineLength(linesArr){
        let initLength = 0;
        for(let line of linesArr){
            let lineLength = line.length;
            if(lineLength > initLength){
                initLength = lineLength;
            }
        }
        return initLength;
    }

    //***************** End of Utility Function Section ***********************************************/

    const wordCountMap = new Map();
    let wordCount = 0;
    let word = "";
    let lastChar = "";
    let firstVal = 0;
    for(let character of strArr){

        // if(firstVal == 0){
        //     word = character;
        //     firstVal=1;
        //     continue;
        // }
  
        // let lastChar = word.charAt(word.length-1);
        // if(isSeparator(character)){
        //     checkMap(word.toLowerCase(), wordCountMap);
        //     word = "";
        //     firstVal = 0;
        // }

        // else if(isNumeric(lastChar)){
        //     if(isNumeric(character)){
        //         word = word + character;
        //     }
        //     else if(isAlphabetical(character)){
        //         checkMap(word.toLowerCase(),wordCountMap);
        //         word = character;
        //     }
        // }
        // else if(isAlphabetical(lastChar)){
        //     if(isAlphabetical(character)){
        //         word = word + character;
        //     }
        //     else if(isNumeric(character)){
        //         checkMap(word.toLowerCase(),wordCountMap);
        //         word = character;
        //     }
        // }

        if(!isSeparator(character)){
            if(isNumeric(character)){
                if(isNumeric(lastChar)){
                    word = word + character;
                    lastChar = character;
                }
                else if (isAlphabetical(lastChar)){
                    checkMap(word.toLowerCase(), wordCountMap);
                    word = character;
                    lastChar = character;
                }
                else if(lastChar == ""){
                    word = character;
                    lastChar = character;
                }
            }
            else if(isAlphabetical(character)){
                if(isAlphabetical(lastChar)){
                    word = word + character;
                    lastChar = character;
                }
                else if (isNumeric(lastChar)){
                    checkMap(word.toLowerCase(), wordCountMap);
                    word = character;
                    lastChar = character;
                }
                else if(lastChar == ""){
                    word = character;
                    lastChar = character;
                }
            }
        }
        else{
            checkMap(word.toLowerCase(), wordCountMap);
            word = "";
            lastChar = "";
        }

        /*
        if(notSeparator(character) && (code > 32 && !isNumeric(character))){
            word = word + character;
        }
        else{
            let lastChar = word.slice(-1);
            if(isNumeric(lastChar) && notSeparator(character) && isNumeric(character)){
                word = word + character;
            }
            else{
                let pWord = removePunctuation(word).toLowerCase();
                checkMap(pWord, wordCountMap);
                word = "";
                word = isNumeric(character) ? (word + character) : word;
            }
        }
        */
    }

    // let finalWord = removePunctuation(word).toLowerCase();
    checkMap(word.toLowerCase(), wordCountMap);
    console.log(wordCountMap)

    //Starting average word length section by getting the length of every word
    const wordLengthMap = new Map();
    let keys = wordCountMap.keys();
    for (let strVar of keys){
        let strlength = strVar.length;
        wordLengthMap.set(strVar, strlength);
    }


    //Section of the code to get average string legth
    let totalStringsLength = 0
    let lengthKeys = wordLengthMap.keys();
    for (let value of lengthKeys){
        //You can take out the wordCountMap.get(value) multiplication after asking the question
        // Is the average length of a word based on the total lengthh of all words (including repetition) or not inclding repetition
        totalStringsLength = totalStringsLength + (wordLengthMap.get(value) * wordCountMap.get(value));
    }
    let averageStringLength = (totalStringsLength/wordCount).toFixed(2);



    // Sources: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    //          https://www.javascripttutorial.net/es6/javascript-map/
    // Source:  https://medium.com/coding-at-dawn/how-to-sort-an-array-numerically-in-javascript-2b22710e3958

    let sortedFrequencyMap = new Map([...wordCountMap.entries()].sort(tieBraker));
    let sortedLengthMap = new Map([...wordLengthMap.entries()].sort(tieBraker));

    console.log(sortedFrequencyMap);
    console.log(sortedLengthMap);

    let tenLongestStrings = [];
    let tenFrequentStrings = [];
    let sortedLengthKeys = [...sortedLengthMap.keys()];

    let sortedFrequenceyKeys = []
    for (let pair of sortedFrequencyMap){
        let jointString = pair[0]+'('+pair[1]+')';
        sortedFrequenceyKeys.push(jointString);
    }


    for(let index in sortedLengthKeys){
        if(index < 10){
            tenLongestStrings.push(sortedLengthKeys[index]);
            tenFrequentStrings.push(sortedFrequenceyKeys[index]);
        }
    }
   
    return {
        nChars: chars,                                                     
        nWords: wordCount,
        nLines: numLines,
        nNonEmptyLines: nonEmptyLines,
        averageWordLength: averageStringLength,
        maxLineLength: findMaxLineLength(linesArr),
        tenLongestWords: tenLongestStrings,
        tenMostFrequentWords: tenFrequentStrings,
    };

}



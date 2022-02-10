// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB


function getStats(txt) {
    // you need to write your own code here

    //Basic logic to count number of characters
    let chars = 0;
    let strArr = txt.split('');
    strArr.forEach(function(){chars+=1;});
   
    // Basic logic to count the number of lines, splitting the total input by 
    // the newline character
    let numLines = 0;
    let linesArr = txt == "" ? [] : txt.split('\n');
    console.log(linesArr);
    linesArr.forEach(function(){numLines+=1;});

    // Basic logic to count non empty lines by checking if the line contains
    //a concrete character
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


    /**
     * function that takes in a word and a Map containing a word:number KV pair if it fulfills certain requirements. 
     if word exists in the map, 1 is added to the value. If the word does not, 
     then a new KV pair is created into the Map
     * 
     * @param {word to be potentially added to the map or added a value} word 
     * @param {map to be updated} map 
     */

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
            wordCount+=1;
        }   
    }

    // Function checks whether a given character is Numeric or not
    function isNumeric(char){
        let code = char.charCodeAt(0);
        if(code > 47 && code < 58){
            return true;
        }
        else{
            return false;
        }
    }
    
    // Functions checks whether a given character is Alphabetical
    function isAlphabetical(char){
        let code = char.charCodeAt(0);
        if((code >= 65 && code <= 90) || (code >= 97 && code <= 122)){
            return true;
        }
        else{
            return false;
        }

    }

    // Function checks whether a certain character is one of the 
    // separator characters outlines in the assignment description
    function isSeparator(char){
        if(char === ' ' || char === '\n'){
            return true;
        }
        else{
            return false;
        }
    }


    // Compare function for the sorting required for this assignment. 
    /**
     * 
     * @param {First KV Pair fom a map to be sorted } a 
     * @param {Second KV Pair fom a map to be sorted } b 
     * @returns a sorting integer value for the sort function
     * 
     * 
     * This sorting function sorts by the Value from the KV pair first. If thats the same, it sorts by the key alphabetically, 
     * with numbers first as per Lorans' request. If not, you would just do a[1].localCompareb[1] I believe
     * Please dont mark me wrng if this is not what he wanted, the other way was much easier to do...
     */
    function tieBraker(a, b){
        // Since we are assuming that both a and b are length 2 arrays with a KV pair
        if(a[1] == b[1]){
            let aContent = a[0];
            let bContent = b[0];
            let aFirst = aContent.charAt(0);
            let bFirst = bContent.charAt(0);
            if ((isNumeric(aFirst) && isNumeric(bFirst)) || (isAlphabetical(aFirst) && isAlphabetical(bFirst))){
                return aContent.localeCompare(bContent);
            }
            else if (isNumeric(aFirst) && isAlphabetical(bFirst)){
                return 1;
            }
            else if(isAlphabetical(aFirst) && isNumeric(bFirst)){
                return -1;
            }
        }
        return b[1]-a[1]; 
    }


    /**
     * finds the maximum length line of an array of lines.
     */
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

    /**
     * for loop in charge of splitting all the words in the text
     * Essentially, checks every character. If not a separator character, then adds a character to the
     * previous word if its of the same type (numeric or alphabetical) 
     * If the character is a separator, then we just add the last word and start the loop again
     */

    for(let character of strArr){

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
    }
    checkMap(word.toLowerCase(), wordCountMap);


    /**
     * For loop that creates the wordLength map 
     */
    const wordLengthMap = new Map();
    let keys = wordCountMap.keys();
    for (let strVar of keys){
        let strlength = strVar.length;
        wordLengthMap.set(strVar, strlength);
    }


    
    /**
     *Section of the code to get average string legth
     We use the keys of the wordLength map to access the map itself and calcualte the average string length. 
     */

    let totalStringsLength = 0
    let lengthKeys = wordLengthMap.keys();
    for (let value of lengthKeys){
        //You can take out the wordCountMap.get(value) multiplication after asking the question
        // Is the average length of a word based on the total lengthh of all words (including repetition)
        totalStringsLength = totalStringsLength + (wordLengthMap.get(value) * wordCountMap.get(value));
    }
    let averageStringLength = (totalStringsLength/wordCount).toFixed(2);



    // Sources: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    //          https://www.javascripttutorial.net/es6/javascript-map/

    /**
     * Sorted the maps with the required sorting function, which can easily be changed if necessaty
     */

    let sortedFrequencyMap = new Map([...wordCountMap.entries()].sort(tieBraker));
    let sortedLengthMap = new Map([...wordLengthMap.entries()].sort(tieBraker));


    // Essentially just creating the output arrays in the following 15 lines
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



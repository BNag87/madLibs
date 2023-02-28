const imp_types = require("./types.js"); //access all verbs

//story data. will need a seperate file for these later and then import them
let str_storyTitle = "The Giant Arsehole";
let str_story = "Wait, my beautiful excercise ball! Come and admire this charming hat!";

//arrays
let ar_story = str_story.split(/([_\W])/);
let ar_alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let ar_CapAlphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

//objects -> need to add new ones in here and in the set arrays function
let obj_matchedTypes = {"matchVer":[], "matchAdj": [], "matchNou": []}; //object that stores all matched word types from a function. 
let obj_types = {"verbRefs":imp_types.ar_REF_verbs, "adjRefs": imp_types.ar_REF_adjectives, "nouRefs":imp_types.ar_REF_nouns};

//Function: returns the first character of a provided string and its alphabet index as an object
const getFirstChar = (theWord) => {
    let index = 0;
    let first = theWord[0]

    for(let i = 0; i < ar_alphabet.length ; i++)
    {
        if(first == ar_alphabet[i] || first == ar_CapAlphabet[i])
        {
            index = i;
            break
        }
        else index = -1;
    }

    let objRes = {"firstChar": first, "index": index}
    return objRes
}

//Function: updates the arrays used to compare and store matched words, depending on the choice made when calling the findverbs function 
const setArrays = (type, wordReference) =>
{
    let targetAr = [];
    let matchAr = [];

    switch(type)
    {
        case 0:
            targetAr = obj_types.verbRefs[getFirstChar(wordReference).index];
            matchAr = obj_matchedTypes.matchVer;
            break;
        case 1:
            targetAr = obj_types.adjRefs[getFirstChar(wordReference).index];
            matchAr = obj_matchedTypes.matchAdj;         
            break
        case 2:
            targetAr = obj_types.nouRefs[getFirstChar(wordReference).index];
            matchAr = obj_matchedTypes.matchNou;         
            break;
    }
    result = {"targetAr": targetAr, "matchAr":matchAr};
    return result
}

const findVerbs = (inputArray, typeChoice) => {

try{
//set the typeChoice arrays
let targetArray = [];
let chosenMatchAR = [];

//FOR EVERY ENTRY IN THE AR_STORY ARRAY...
    topLoop:
    for(let i = 0; i < inputArray.length; i++) 
        {
            //get the first word...
            let wordRef = inputArray[i];

            //check that first character is actually an alphabetic character
            //then choose the right arrays to compare against and put results in to
            if((/\P{L}/gu.test(wordRef) == true) || wordRef == "")
                {
                    continue
                }
                else
                {
                    targetArray = setArrays(typeChoice, wordRef).targetAr
                    chosenMatchAR = setArrays(typeChoice, wordRef).matchAr
                }

            //now for every entry in the subarray chosen above...
            middleLoop:
            for(let o = 0; o < (targetArray.length-1); o++)
            {
                //determine the nth character of the word provided above
                let curVerb = targetArray[o] //character of word (from outer loop "o")

                //then check each character matches the same index as the provided word
                innerLoop:
                for(let p = 0; p < (curVerb.length); p++)
                {
                    //if punctuation or a number is found on the current character, skip this loop
                    if(/\P{L}/gu.test(wordRef[p] || wordRef[p] == ""))
                    {
                        break middleLoop
                    }

                    //check index is not greater than the length of the word or verb (so loop doesnt overflow and crash)
                    if(p >= curVerb.length || p >= wordRef.length)
                    {
                        break middleLoop
                    }
                    //then, check if characters match. if not, break this loop
                    if(curVerb[p].toLowerCase() != wordRef[p].toLowerCase())
                    {
                        break
                    }
                    
                    //then, check if end has already been reached OR characters do not match
                    if((p+1) == curVerb.length && (p+1) >= (wordRef.length-2))
                    {
                        result = {"originalWord":wordRef, "matchedWord":curVerb, "iIndex":i, "typeChoice":typeChoice}
                        chosenMatchAR.push(result)
                        break middleLoop
                    }

                    //if the char matched AND the index didn't overflow, continue to the next loop
                    if(curVerb[p].toLowerCase() === wordRef[p].toLowerCase() && (p+1) != curVerb.length)
                    {
                        continue
                    }
                    
                }
            }
        }
    }
        catch(error)
        {
            console.log("\n!=====---ERROR IN findVerbs()---=====!")
            const stackTrace = error.stack;
            const regexMatch = /\d+:\d+/g.exec(stackTrace);
            const lineNumber = regexMatch ? regexMatch[0] : "N/A";
          
            console.log(`Error at line ${lineNumber}: ${error.message}`)
            console.log("!=====--------------------------=====!\n")
        }
}

findVerbs(ar_story, 0);
findVerbs(ar_story, 1);
findVerbs(ar_story, 2);

console.log("====================\n'"+str_storyTitle+"'\n====================")
console.table(obj_matchedTypes.matchVer)
console.table(obj_matchedTypes.matchAdj)
console.table(obj_matchedTypes.matchNou)    
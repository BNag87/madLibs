const imp_types = require("./types.js"); //access all verbs

//story data. will need a seperate file for these later and then import them
let str_storyTitle = "The Magic Tree";
let str_story = "Damages the black nail and kill the stupid misty jam";

//arrays
let ar_story = str_story.split(/([_\W])/);
let ar_alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let ar_type = 0; //changes the index of which reference array to use (for verbs, adjectives etc)

//objects -> need to add new ones in here and in the set arrays function
let obj_matchedTypes = {"matchVer":[], "matchAdj": []}; //object that stores all matched word types from a function. 
let obj_types = {"verbRefs":imp_types.ar_REF_verbs, "adjRefs": imp_types.ar_REF_adjectives};

//Function: returns the first character of a provided string and its alphabet index as an object
const getFirstChar = (theWord) => {
    let index = 0;
    let first = theWord[0]

    for(let i = 0; i < ar_alphabet.length ; i++)
    {
        if(first.toLowerCase() == ar_alphabet[i])
        {
            index = i;
            break
        }
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
            //then choose the right arrays to compare against and put results in to
            targetArray = setArrays(typeChoice, wordRef).targetAr
            chosenMatchAR = setArrays(typeChoice, wordRef).matchAr
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
                    if(/[^a-zA-Z0-9\s]/.test(curVerb[p]))
                    {
                        continue 
                    }

                    //check index is not greater than the length of the word or verb (so loop doesnt overflow and crash)
                    if(p >= curVerb.length || p >= wordRef.length)
                    {
                        break
                    }
                    //then, check if characters match. if not, break this loop
                    if(curVerb[p].toLowerCase() != wordRef[p].toLowerCase())
                    {
                        break
                    }
                    
                    //then, check if end has already been reached OR characters do not match
                    else if((p+1) == curVerb.length && (p+1) >= (wordRef.length-2))
                    {
                        result = {"originalWord":wordRef, "matchedWord":curVerb, "iIndex":i, "typeChoice":typeChoice}
                        chosenMatchAR.push(result)
                        break middleLoop
                    }

                    //if the char matched AND the index didn't overflow, continue to the next loop
                    else if(curVerb[p].toLowerCase() === wordRef[p].toLowerCase() && (p+1) != curVerb.length)
                    {
                        continue
                    }
                    
                    //if none of the above conditions are met, go to the next word
                    else
                    {
                        break
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

console.table(ar_story)
findVerbs(ar_story, 0);
findVerbs(ar_story, 1);
console.table(obj_matchedTypes.matchVer)
console.table(obj_matchedTypes.matchAdj)  
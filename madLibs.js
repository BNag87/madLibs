const imp_types = require("./types.js"); //access all verbs

let str_storyTitle = "The Magic Tree";
let str_story = "Damages the black nail and kill the stupid misty jam";

let ar_story = str_story.split(/([_\W])/);
let ar_alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let ar_type = 0; //changes the index of which reference array to use (for verbs, adjectives etc)

let obj_matchedTypes = {"matchVer":[], "matchAdj": []}; //object that stores all matched word types from a function. 
let obj_types = {"verbRefs":imp_types.ar_REF_verbs, "adjRefs": imp_types.ar_REF_adjectives};

let typesKeys = Object.keys(obj_types);
let matchKeys = Object.keys(obj_matchedTypes);

//this returns the first character of a string and its alphabet index as an object
const getFirstChar = (theWord) => {
    let index = 0;
    let first = theWord[0]

    for(let i = 0; i < ar_alphabet.length ; i++)
    {
        // console.log("---------->getfirstchar: loop-"+i+", character-"+ar_alphabet[i])
        if(first.toLowerCase() == ar_alphabet[i])
        {
            index = i;
            break
        }
    }

    let objRes = {"firstChar": first, "index": index}
    // console.log("------------->objRes set as:")
    // console.table(objRes)
    // console.log("------------->\n")
    return objRes
}

//this function updates the arrays used to compare and store words, depending on the choice made when calling the findverbs function 
const setArrays = (type, wordReference) =>
{
    // console.log("\tsetArrays INTERNALS -> type: "+type+", wordReference: "+wordReference)
    switch(type)
    {
        case 0:
            // console.log("\tCase 0 selected - VERBS")
            // console.log("\tgetFirstChar(wordReference).index = "+getFirstChar(wordReference).index)
            targetArray = obj_types.verbRefs[getFirstChar(wordReference).index];
            // console.log("\tCase 0, targetArray: "+targetArray)
            chosenMatchAR = obj_matchedTypes.matchVer;
            // console.log("\tCase 0, chosenMatchAR: "+chosenMatchAR)
            break;
        case 1:
            // console.log("\tCase 1 selected - ADJECTIVES")
            // console.log("\tgetFirstChar(wordReference).index = "+getFirstChar(wordReference).index);
            targetArray = obj_types.adjRefs[getFirstChar(wordReference).index];
            // console.log("\tCase 1, targetArray: "+targetArray)
            chosenMatchAR = obj_matchedTypes.matchAdj;         
            // console.log("\tCase 1, chosenMatchAR: "+chosenMatchAR)
            break
    }
//     console.log("After calling setArrays:")
// console.log(targetArray)
// console.log(chosenMatchAR)
}

const findVerbs = (inputArray, typeChoice) => {

try{
console.log("On entry to findVerbs, typeChoice was "+typeChoice)
//set the typeChoice arrays
let targetArray = [];
let chosenMatchAR = [];

//FOR EVERY ENTRY IN THE AR_STORY ARRAY...
    topLoop:
    for(let i = 0; i < inputArray.length; i++) 
        {
            //get the first word...
            let wordRef = inputArray[i];
            setArrays(typeChoice, wordRef)
console.log("On loop: ["+i+"], current word is " +wordRef)

            //then select the subarray of verbs to search through (so match it alphabetically)...
// console.log("\ttargetArray is: "+targetArray)

            //now for every entry in the subarray...
            middleLoop:
            for(let o = 0; o < (targetArray.length-1); o++)
            {
                let curVerb = targetArray[o] //character of word (from outer loop "o")
                console.log("--->On middle loop: ["+o+"], curVerb is " +curVerb)
                
                //check each character matches the same index as the provided word
                innerLoop:
                for(let p = 0; p < (curVerb.length); p++)
                {
                    console.log("Loops i/o/p: ["+i+"/"+o+"/"+p+"], Word/Verb: ["+curVerb+"/"+wordRef+"], WordCha/RefCha: ["+wordRef[p]+"/"+curVerb[p]+"]")
                    
                    if(/[^a-zA-Z0-9\s]/.test(curVerb[p]))
                    {
                        console.log(wordRef+" - Char was not alphabetic")
                        continue //if punctuation or a number is found, skip this loop
                    }

                    //first, check index p is not greate than the length of the word or verb
                    if(p >= curVerb.length || p >= wordRef.length)
                    {
                        // console.log("---> INDEX OVERFLOW. BREAKING")
                        break
                    }
                    //then, check if characters match. if not, break this loop
                    if(curVerb[p].toLowerCase() != wordRef[p].toLowerCase())
                    {
                        // console.log("---> CHARS DID NOT MATCH. BREAKING")
                        break
                    }
                    
                    //then, check if end has already been reached OR characters do not match
                    else if((p+1) == curVerb.length && (p+1) >= (wordRef.length-2))
                    {
                        result = {"originalWord":wordRef, "matchedWord":curVerb, "iIndex":i, "typeChoice":typeChoice}
                        console.log("A result was generated! ")
                        console.log(result)
                        console.log("-------------")
                        chosenMatchAR.push(result)
console.log("------\n\tResult generated as: ")
console.log(result)                       
console.log("-----") 
                        break middleLoop
                    }

                    else if(curVerb[p].toLowerCase() === wordRef[p].toLowerCase() && (p+1) != curVerb.length)
                    {
                        continue
                    }
                    
                    else
                    {
                        // console.log("--->SoMe OtHeR CoNdItIoN")
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
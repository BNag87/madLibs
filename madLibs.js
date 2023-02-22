const imp_types = require("./types.js"); //access all verbs

let str_storyTitle = "The Magic Tree";
let str_story = "Damages the black nail and kill the stupid misty jam";

let ar_story = str_story.split(/([_\W])/);
let ar_alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let ar_type = 0; //changes the index of which reference array to use (for verbs, adjectives etc)

let obj_matchedTypes = {"matchVer":[], "matchAdj": []}; //object that stores all matched word types from a function. 
let obj_types = {"verbRefs":imp_types.ar_REF_verbs, "adjRefs": imp_types.ar_REF_Adjectives};

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
    return objRes
}

const findVerbs = (inputArray, typeChoice) => {

try{
console.log("On entry to findVerbs, typeChoice was "+typeChoice)
    //FOR EVERY ENTRY IN THE AR_STORY ARRAY...
    topLoop:
    for(let i = 0; i < inputArray.length; i++) 
        {
            //get the first word...
            let wordRef = inputArray[i];
console.log("On loop: ["+i+"], current word is " +wordRef)

            if(/[^a-zA-Z0-9\s]/.test(wordRef))
            {
                continue //if punctuation or a number is found, skip this loop
            }

            //then select the subarray of verbs to search through (so match it alphabetically)...
            let targetArray = [];
            switch(typeChoice)
                {
                    case 0:
                        targetArray = obj_types.verbRefs[getFirstChar(wordRef).index]
                        break
                    case 1:
                        targetArray = obj_types.adjRefs[getFirstChar(wordRef).index]
                        break
                }
console.log("\ttargetArray is: "+targetArray)

            //now for every entry in the subarray...
            middleLoop:
            for(let o = 0; o < (targetArray.length-1); o++)
            {
                let curVerb = targetArray[o] //character of word (from outer loop "o")
                //check each character matches the same index as the provided word
                innerLoop:
                for(let p = 0; p < (curVerb.length); p++)
                {
                    // console.log("Loops i/o/p: ["+i+"/"+o+"/"+p+"], Word/Verb: ["+curVerb+"/"+wordRef+"], WordCha/RefCha: ["+wordRef[p]+"/"+curVerb[p]+"]")
                    
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
                        // console.log("--->index was length of word AND greater than wordlength-2. PUSHING AND BREAKING")
                        let chosenMatchAR = [];
                        switch(typeChoice)
                        {
                            case 0:
                                chosenMatchAR = obj_matchedTypes.matchVer
                                break;
                            case 1:
                                chosenMatchAR = obj_matchedTypes.matchAdj
                                break;
                        }
                        result = {"originalWord":wordRef, "matchedWord":curVerb, "iIndex":i, "typeChoice":typeChoice}
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
            console.log("!=====---ERROR IN findVerbs()---=====!\n\t→"+error+"\n!=====------FULL-↓↓↓-ERROR-----=====!")
            console.log(error)
        }
}
console.table(ar_story)
findVerbs(ar_story, 0);
findVerbs(ar_story, 1);
console.table(obj_matchedTypes.matchVer)
console.table(obj_matchedTypes.matchAdj)  
const ar_Verbs = require("./verbs.js");

let str_storyTitle = "The Magic Tree";
let str_story = "Damages the nail and kill the stupid jam";

let ar_story = str_story.split(/([_\W])/);
let ar_alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let ar_matchedVerbs = [];

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

const findVerbs = (inputArray) => {

try{
    //FOR EVERY ENTRY IN THE AR_STORY ARRAY...
    topLoop:
    for(let i = 0; i < inputArray.length; i++) 
        {
            //get the first word...
            let wordRef = inputArray[i];
            
            if(wordRef == "," || wordRef == "!" || wordRef == "?" || wordRef == "." || wordRef == " " || !wordRef)
            {
                continue //if punctuation, whitespace or null is found, skip this loop
            }

            //then select the subarray of verbs to search through (so match it alphabetically)...
            let targetArray = ar_Verbs.ar_REF_verbs[getFirstChar(wordRef).index];
            
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
                        ar_matchedVerbs.push({"originalWord":wordRef, "matchedWord":curVerb, "iIndex":i, "oIndex":o, "pIndex": p})
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
findVerbs(ar_story);
console.table(ar_matchedVerbs)  
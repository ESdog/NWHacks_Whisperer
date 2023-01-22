console.log('<----- Injected script started running ----->');

// return json type object {"MathJax": MathJax DOM object}
function checkMathJax() {
    let main = {};
   // solution to "window.MathJax is not a function" — it is just an attribute
    main.MathJax = window.MathJax;

    // this breakpoint works!
    alert(`MathJax Version:` + main.MathJax.version);
    return main;
}

let mathjax = checkMathJax();
// postMessage is not able to construct objects with methods, thus, flatten mathjax into string
mathjax = JSON.parse(JSON.stringify(mathjax));
window.postMessage({ type: "FROM_PAGE", essential: mathjax });


// ========== utility functions below
const ESCAPE_CHARACTERS = {
    "\b": "b",
    "\f": "f",
    "\n": "n",
    "\r": "r",
    "\t": "t",
    "\v": "v"
  }
  
  
  //If "\u" and "\x" are in the strings, not supposed to be possible options, remained
  //INVARIANT: ids and tex are tandem worklists and the same length
  //returns a match of all the latex that matches userInputStr
  const scanItemsForMatch = (userInputString, ids, tex) => {
    let matchedElementIds = [];
    for (let i = 0; i < ids.length; i++) {
      latexString = removeDoubleBackslash(tex[i]);
      userInputString = removeSingleBackslash(userInputString);
  
      if (latexString.includes(userInputString)) {
        matchedElementIds.push(ids[i]);
      }
    }
  
    highlightElements(matchedElementIds);
    return matchedElementIds;
  }
  
  //@param matchedElementsIds is a list of String
  const highlightElements = (matchedElementIds) => {
    for (let i = 0; i < matchedElementIds.length; i++) {
      const locationOfElem = document.getElementById(matchedElementIds[i]);
      const parentElem = locationOfElem.parentElement;
      if (parentElem.tagName != 'p') {
        locationOfElem.parentElement.style.backgroundColor = "red"; //for now
      } else {
        
      }
    }
  }
  
  
  //returns the same string except without escaped backslashes 
  //ie:""\\frac\n" returns "frac\n"
  const removeDoubleBackslash = (texString) => {
    let newString = "";
    for (let i = 0; i < texString.length; i++) {
      if (texString[i] != "\\") {
        newString += texString[i];
      }
    }
    return newString;
  }
  
  //returns the same string except without escaped backslashes 
  //ie:"\frac\\n" returns "frac\\n"
  const removeSingleBackslash = (texString) => {
    const escapedKeys = Object.keys(ESCAPE_CHARACTERS)
    let newString = "";
    for (let i = 0; i < texString.length; i++) {
      const charToParse = texString[i];
      if (escapedKeys.includes(charToParse)) {
        newString += ESCAPE_CHARACTERS[charToParse];
      } else {
        newString += charToParse;
      }
    }
    return newString;
  }
  
  
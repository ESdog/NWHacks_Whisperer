

// returns array of all math jax objects
const getAllMathItems = () => {
    const mathJaxObj = window.MathJax;

    if (mathJaxObj && mathJaxObj.version[0] == '2') {
        const mathItems = mathJaxObj.Hub.getAllJax();
        return mathItems;
    } else {
        console.log("MathJax version 2 not found on site as window.MathJax = " + mathJaxObj );
        return;
    }
}

// ERROR: does not like backslashes
//returns a match of all the latex that matches userInputStr
const scanItemsForMatch = (userInputString) => {
    const matchedElements = getAllMathItems().filter((mathItem) => {
        userInputString = userInputString;
        const itemLatex = mathItem.originalText;

        return itemLatex.includes(userInputString);
    });

    highlightElements(matchedElements);
    return matchedElements;
}

//@param matchedElements
const highlightElements = (matchedElements) => {
    for (let i = 0; i < matchedElements.length; i++) {
        const locationOfElem = document.getElementById(matchedElements[i].inputID);
        locationOfElem.parentElement.style.backgroundColor = "red"; //for now
    }
}




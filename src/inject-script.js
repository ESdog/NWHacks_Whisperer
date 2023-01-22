console.log('<----- Injected script started running ----->');

/*
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
*/

// return json type object {"MathItems": array of MathItem object}
const getAllMathItems = () => {
    let main = {};

    const mathJaxObj = window.MathJax;

    if (mathJaxObj && mathJaxObj.version[0] == '2') {
        talkToMathJaxV2();
    } else if (mathJaxObj && mathJaxObj.version[0] == '3') {
        main.mathItems =  mathJaxObj.Hub.getAllJax();
    } else { // no MathJax
        main.mathItems = [];
        console.log("MathJax version 2 not found on site as window.MathJax = " + mathJaxObj );
    }

    return main;
}

// use v2 syntax to get math items
const talkToMathJaxV2 = () => {
    const arrContainer = window.MathJax.Hub.getAllJax();
    const arr = arrContainer.arrContainer;
    console.log(arr);
    console.log(arrContainer);

    // set up arrays to store objects in same order
    let inputIds = [];
    let originalTexts = [];

    for (const item of arr) {
        console.log(item);
        // access using v2 keys
        inputIds.push(item.inputID);
        originalTexts.push(item.originalText);
    }

    console.log(inputIds);
    console.log(originalTexts);

    // combine arrays into object
    mathItems = {ids: inputIds, tex: originalTexts};

    return mathItems;
}

// use v3 syntax to get math items
const talkToMathJaxV3 = () => {
    return window.MathJax.startup.document.getMathItemsWithin(document);
}


// post message with sender address, mathJax version (whether content empty), and content
window.postMessage({ type: "FROM_PAGE", // address
    jaxVersion: window.MathJax.version, // version (signature)
    essential: getAllMathItems() // tandem arrays with keys: ids, tex
});



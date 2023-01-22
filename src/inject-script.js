console.log('<----- Injected script started running ----->');

// return json type object {"MathItems": array of MathItem object}
const getAllMathItems = () => {

    const mathJaxObj = window.MathJax;

    if (mathJaxObj && mathJaxObj.version[0] == '2') {
        talkToMathJaxV2();
    } else if (mathJaxObj && mathJaxObj.version[0] == '3') {
        talkToMathJaxV3();
    } else { // no mathjax
        main.mathItems = [];
        console.log("MathJax and image math not found on site");
    }

}

// search for images with math/latex keyword in class
const searchImgAlt = () => {

}

// use v2 syntax to get math items
const talkToMathJaxV2 = () => {
    const arr = window.MathJax.Hub.getAllJax();

    // set up arrays to store objects in same order
    let inputIds = [];
    let originalTexts = [];

    for (const item of arr) {
        // access using v2 keys
        inputIds.push(item.inputID);
        originalTexts.push(item.originalText);
    }

    console.log(inputIds);
    console.log(originalTexts);

    // combine arrays into object
    const mathItems = {ids: inputIds, tex: originalTexts};

    return mathItems;
}

// use v3 syntax to get math items
const talkToMathJaxV3 = () => {
    const arr = window.MathJax.startup.document.getMathItemsWithin(document);


}


// post message with sender address, mathJax version (whether content empty), and content
window.postMessage({ type: "FROM_PAGE", // address
    jaxVersion: window.MathJax.version, // version (signature)
    essential: getAllMathItems() // tandem arrays with keys: ids, tex
});



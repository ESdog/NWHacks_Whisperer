console.log('<----- Injected get-math script started running ----->');

// return json type object {"MathItems": array of MathItem object}
const getAllMathItems = () => {

    let ret;
    const mathJaxObj = window.MathJax;

    if (mathJaxObj && mathJaxObj.version[0] == '2') {
        console.log('Searching MathJax version' + mathJaxObj.version);
        ret = talkToMathJaxV2();
    } else if (mathJaxObj && mathJaxObj.version[0] == '3') {
        console.log('Searching MathJax version' + mathJaxObj.version);
        ret = talkToMathJaxV3();
    } else { // no mathjax
        console.log('Searching lurking image math... wikmedia API?');
        ret = searchImgAlt();
    }

    console.log(ret);
    return ret;
}

// search for images with math/latex keyword in class
const searchImgAlt = () => {

    // set up arrays to store objects in same order
    let imgIds = [];
    let imgAlts = [];

    const allImages = document.querySelectorAll(`img`);
    for (let i = 0; i < allImages.length; i++) {
        const img = allImages[i];

        assignId(img,i);

        if (img.className.includes(`math`) || (img.className.includes(`latex`))) {
            imgIds.push(img.id);
            imgAlts.push(img.alt);
        }
    }
    // combine arrays into object
    // image math I classify as wikimedia
    return {domain: `Wikimedia API`,
        ids: imgIds,
        tex: imgAlts};
}

const assignId = (element,cnt) => {
    const whisper = `whisperid` + cnt;
    element.setAttribute('id',whisper);
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

    // combine arrays into object
    const mathItems = {domain: `MathJax Version ` + window.MathJax.version,
        ids: inputIds,
        tex: originalTexts};

    return mathItems;
}

// TODO use v3 syntax to get math items
const talkToMathJaxV3 = () => {
    const arr = window.MathJax.startup.document.getMathItemsWithin(document);

}


// post message with sender address, mathJax version (whether content empty), and content
window.postMessage({ type: "FROM_PAGE", // address
    essential: getAllMathItems() // tandem arrays with keys: ids, tex
});



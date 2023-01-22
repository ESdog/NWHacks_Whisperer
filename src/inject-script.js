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
        main.mathItems =  mathJaxObj.Hub.getAllJax();
    } else { // error
        main.mathItems = [];
        console.log("MathJax version 2 not found on site as window.MathJax = " + mathJaxObj );
    }

    return main;
}

let mathItems = getAllMathItems();
mathItems = JSON.parse(JSON.stringify(mathItems));
window.postMessage({ type: "FROM_PAGE", essential: mathItems });



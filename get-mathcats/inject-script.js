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

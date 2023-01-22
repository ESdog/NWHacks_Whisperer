console.log('<----- Injected script started running ----->');

function checkMathJax() {
    let main = [];

    main = window.MathJax();

    return main;
}

setInterval(() => {
    let mathjax = checkMathJax();
    window.postMessage({ type: "FROM_PAGE", essential: mathjax });
}, 500);
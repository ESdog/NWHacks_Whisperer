
window.onload = function() {getAllMathItems()};

// returns array of all math jax objects
const getAllMathItems = () => {
    const mathItems = window.MathJax.Hub.getAllJax();
    console.log(mathItems);
    return mathItems;
}
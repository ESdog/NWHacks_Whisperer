alert('first alert')

let mathitems = window.MathJax.Hub.getAllJax();
alert(mathitems.length)

for (let i = 0, l = mathitems.length; i < l; i++) {
    console.log('found math item');
    alert('found math item')
}


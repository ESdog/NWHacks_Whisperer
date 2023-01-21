alert('first alert')

let mathitems = window.MathJax.Hub.getAllJax();

for (let i = 0, l = mathitems.length; i < l; i++) {
    // paragraphs[i].src = 'http://placekitten.com/' + paragraphs[i].width + '/' + paragraphs[i].height;
    console.log('found math item');
    alert('found math item')
}


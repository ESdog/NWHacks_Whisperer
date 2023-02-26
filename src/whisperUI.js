window.postMessage("hello from whisperUI","*");
console.log('<----- whisper: bare-bones inject-script said hello ----->');
window.addEventListener("message", (event) => {
    console.log("whisperUI received: " + event.data);
})

/* Post user search as message on keyup
   @warning Works in extension window but an extraneous Uncaught TypeError is thrown in webpage console
 */
const search = window.document.getElementById("searchText");
// @warning Extension console displays correct log; webpage console displays null
console.log("element to attach keyup listener to:" + search);
search.addEventListener("keyup", function () {
    if(search.value == "") {
        return;
    }
    window.postMessage(search.value,"*");
});


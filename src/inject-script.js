console.log('<----- whisper: bare-bones inject-script started running ----->');

window.postMessage("hello from inject-script","*");
console.log('<----- whisper: bare-bones inject-script said hello ----->');
window.addEventListener("message", (event) => {
    console.log("inject-script received: " + event.data);
})





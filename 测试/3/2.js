var myname = "hello world";
function printName() {
    console.log(myname); 
    if (0) {
        var myname = "LLM is coming"; 
    }
    console.log(myname); 
}
printName();
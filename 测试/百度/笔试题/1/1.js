require("readline").createInterface({ input: process.stdin });
var iter = process.stdin[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // write your code here
    while (line = await readline()) {
        let tokens = line.split();
        let a = parseInt(tokens[0]);
        let b = parseInt(tokens[1]);
        console.log(a + b);
    }
})();
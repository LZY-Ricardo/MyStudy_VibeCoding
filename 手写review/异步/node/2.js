const fs = require('fs');
const start = Date.now();

setTimeout(() => {
    console.log('setTimeout exec', Date.now() - start);
}, 200)

fs.readFile('./index.js', 'utf-8', (err, data) => {
    console.log('file read');
    const start = Date.now();
    while (Date.now() - start < 300) { };
})

// 输出结果：
// file read
// setTimeout exec 313ms

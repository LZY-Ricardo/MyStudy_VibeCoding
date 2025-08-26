const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
    reject(); 
});

setTimeout(() => { console.log(3) }, 0);

promise
   .then(() => { console.log(4) })
   .then(() => { console.log(5) })
   .catch(() => { console.log(6) });

console.log(7);
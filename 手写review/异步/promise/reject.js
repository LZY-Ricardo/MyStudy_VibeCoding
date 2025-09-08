Promise.reject('555').then((value) => {
    console.log('res:',value);
    
}).catch(err => {
    console.log(err);
    
})
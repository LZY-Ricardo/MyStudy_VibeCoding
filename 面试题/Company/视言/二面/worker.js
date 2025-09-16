console.log(self); // self 指向当前线程
self.addEventListener('message', (e) => {
    console.log('worker线程收到消息', e.data);
    fetch(e.data)
    .then(data => {
        console.log(data);
        self.postMessage('hello main')
    })
})
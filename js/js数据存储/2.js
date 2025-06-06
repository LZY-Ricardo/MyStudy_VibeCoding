let obj = {  // object
    name: 'Ricardo',
    age: 18,
    health: 100,
    mood: 100,
    flower: function(){
        console.log('送诺诺鲜花');
        this.mood++
    },
    reject: function() {
        console.log('被拒绝')
        this.mood--
    },
}

// obj.age++ // obj.age = obj.age + 1
// console.log(obj.age);

// obj.flower()
// obj.flower()
// obj.flower()
// obj.reject()
// obj.reject()

// obj.girlfriend = '绘梨衣'

// let meiGirl = 'myGirl'
// // obj.meiGirl = '上杉绘梨衣'
// obj[meiGirl] = '上杉绘梨衣'

delete obj.flower

console.log(obj);




let obj2 = new Object({
    name: '路明非',
    age: 20,
})

console.log(obj2);

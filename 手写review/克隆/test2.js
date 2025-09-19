let reg = new RegExp(/test/gi)
console.log(reg.source, reg.flags);

let date = new Date()
console.log(date);
console.log(date.getTime());

let newDate = new Date(date.getTime())
console.log(newDate);

let map = new Map()
map.set('a', 1)
map.set('b', 2)
console.log(map);
map.forEach((value, key) => {
    console.log(key, value);
})
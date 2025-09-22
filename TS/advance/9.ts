// type Lengthwise = string

// interface Person {
//     age: number
// }

// function log<T extends Person>(arg: T): T {
//     console.log(arg.age)
//     return arg
// }

// log({name: 'Tom', age: 18})

// log('123');
// log([1, 2, 3])




function getProperty<T, U extends keyof T>(obj: T, key: U) {
    return obj[key]
}

const obj2 = {
    a: 1,
    b: 2
}

console.log(getProperty(obj2, 'a'));

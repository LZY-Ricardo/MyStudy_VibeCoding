function person(p: Person) {
    return `hello, i am ${p.name}`
}

interface Person {
    name: string,
}

// 联合类型
type abc = number | string


// 交叉类型
type def = Person & { age: number }

let object: def = {
    name: 'a',
    age: 10
}

type p = Person
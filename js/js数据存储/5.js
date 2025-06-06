function foo(person) {
    person.age = 20
    person = {
        name: '路明非',
    }
    return person
}
let p1 = {
    name: '路鸣泽',
    age: 18
}
let p2 = foo(p1)

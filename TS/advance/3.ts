// function identity<T>(arg: T): T {
//     return arg
// }

// let output = identity<string>('myString')


interface IIdentity<T> {
    name : T
}

let obj: IIdentity<string> = {
    name: 'abc'
}

function identity(arg: IIdentity<number>) {
    return arg.name
}
identity({ name: 1 })

// class 即是类 也是类型
class MyClass<T> {
    name: T = {} as T;
}

function Person(): MyClass<string> {
    return new MyClass<string>()
}
// let x:any = 'hello'
// let y:number
// y = x

// let x: unknown
// x = 1
// x = '1'
// let z: string
// z = x

// let x: never
// x = true

// const x: boolean = true
// const y: string = '123'
// const y2: String = new String('123')
// const z: number = 123
// const b: bigint = 312312312n
// const c: symbol = Symbol('123')
// const d: undefined = undefined
// const e: null = null


// const o: object = {foo: 123}
// const o2: Object = new Object()
// const o3: Object = new String('123')

// const aa:'hello' = 'hello'

// const aa: number | string = '1'

// const sex: 'male' | 'female' = 'female'

// type sexType = string | number
// let an: sexType = 'male'

// let arr: (number | string)[] = [1, 2, 3, '4']
// let arr2: Array<number | string> = [1, 2, 3, '4'] // 泛型

// // 元组
// let tuple: [number, string, Function] = [1, '2', function(){}]

// interface Person {
//     name: string
//     age?: number
//     sex: 'male' | 'female'
// }
// let p: Person = {name: '张三', sex: 'male'}
// String({a: 1})
// {a: 1}.toString() // '[object Object]'




// Number({a: 1})
// ToNumber({a: 1})
// ToPrimitive({a: 1}, Number)
// {a: 1}.valueOf() // {a: 1}
// {a: 1}.toString() // '[object Object]'
// ToNumber('[object Object]') // NaN

// '3' - '2' // 1
// Number('3') - Number('2')




// [1, 2] - {a: 1}
// Number([1, 2]) - Number({a: 1})

// ToNumber([1, 2])
// ToPrimitive([1, 2], Number)
// [1, 2].valueOf() // [1, 2]
// [1, 2].toString() // '1,2'
// ToNumber('1,2') // NaN

// ToNumber({a: 1})
// ToPrimitive({a: 1}, Number)
// {a: 1}.valueOf() // {a: 1}
// {a: 1}.toString() // '[object Object]'
// ToNumber('[object Object]') // NaN



[] == ![]
// [] == ![] => !true => false => 0
// [] == 0
// ToNumber([]) 
// ToPrimitive([], Number)
// valueOf() // []
// toString() // ''
// ToNumber('') // 0
// 0 == 0 // true



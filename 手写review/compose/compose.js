let middlewares = []

middlewares.push((ctx, next) => {
    console.log(1);
    next()
    console.log(2);
})

middlewares.push((ctx, next) => {
    console.log(3);
    next()
    console.log(4);
})


middlewares.push((ctx, next) => {
    console.log(5);
    next()
    console.log(6);
})

let fn = compose(middlewares)
fn({})

function compose(middlewares) {
    return function (context) {
        function dispatch(number) {
            if (number >= middlewares.length) {
                return
            }
            const nextFn = () => {
                dispatch(number + 1)
            }
            middlewares[number](context, nextFn)
        }
        dispatch(0)
    }
}
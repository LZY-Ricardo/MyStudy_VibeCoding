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
        function dispatch(i) {
            // 出口
            if (i >= middlewares.length) {
                return
            }
            const nextFn = () => {
                dispatch(i + 1)
             }
            middlewares[i](context, nextFn)
        }
        dispatch(0)
    }
}

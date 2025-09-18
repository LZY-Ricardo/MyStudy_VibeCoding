const koa = new require('koa')
const app = new koa()

// function main(ctx, next) {
//     ctx.response.body = 'hello world'
//     next()
// }

// function logger(ctx, next) {
//     console.log('logger');
//     next()
// }

// app.use(main)
// app.use(logger)

function A(ctx, next) {
    console.log(1);
    next()
    console.log(2);
}

function B(ctx, next) {
    console.log(3);
    next()
    console.log(4);
}

function C(ctx, next) {
    console.log(5);
    next()
    console.log(6);
}

app.use(A)
app.use(B)
app.use(C)

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})
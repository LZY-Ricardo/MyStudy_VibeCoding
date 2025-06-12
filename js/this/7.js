// function a() {
//     let b = function() {
//         let c = () => {
//             let d = () => {
//                 console.log(this)
//             }
//             d()
//         }
//         c()
//     }
//     b()
// }

var a = 1
var obj = {
    a: 2,
    bar: function() {
        const baz = () => {
            console.log(this.a)
        }
        baz()
    },
    
}
obj.bar()
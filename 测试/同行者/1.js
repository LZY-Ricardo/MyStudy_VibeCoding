// 字符串拆分成数组，如”ab&&2”通过”&&”做分隔符，分割得到字符串数组[“ab”,”2”]
// 组合数组，如[“ab”,”2”]通过”&&”做组合符，组合得到字符串”ab&&2”

function spiltString(str, sp) {
    const res = []
    let start = 0
    let index
    while ((index = str.indexOf(sp, start)) !== -1) {
        let s = str.slice(start, index)
        res.push(s)
        start = index + sp.length
    }
    if (start < str.length) {
        res.push(str.slice(start))
    }
    return res
}
const str = 'ab&&2&&3666'
console.log(spiltString(str, '&&'));


function combine(arr, sp) {
	let res = ''
	for (let i = 0; i < arr.length; i++) {
		res += arr[i]
		if (i < arr.length - 1) {
			res += sp
		}
	}
	return res
}

var countStudents = function(students, sandwiches) {
    let nums = 0
    while (nums < students.length){
        if (students[0] === sandwiches[0]) {
            students.shift()
            sandwiches.shift()
            nums = 0
        }  else {
            let s = students.shift()
            students.push(s)
            nums++
        }
        // console.log(students, sandwiches)
    }
    return nums
};
let students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
countStudents(students, sandwiches)
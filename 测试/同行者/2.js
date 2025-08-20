// 约瑟夫环问题变种
// 有n个人围成一圈，从第一个人开始报数，报到m的人出列，再从第一个人开始报数，报到m的人出列，以此类推，直到所有人都出列，求最后留下的人

function findLastPerson(n, m) {
    let people = new Array(n).fill(0).map((_, index) => index + 1);
    let index = 0;

    while (people.length > 1) {
        index = (m - 1) % people.length;
        people.splice(index, 1)
    }

    console.log(`最后留下: ${people[0]}`);
    return people[0];
}

// 示例调用，n=3，m=4
findLastPerson(3, 4);



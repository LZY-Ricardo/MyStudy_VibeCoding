function isString(test: any): test is string {
    return typeof test === 'string'
}

if (isString('123')) {
    // 想要在这个分支中, test 被收窄为 string 类型
}
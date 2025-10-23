interface ITest {
    a: string;
    b?: number;
    c: boolean;
}

// 忽略 a 属性，构成新的类型
type TA = Omit<ITest, 'a'>

// 只选择 a 属性，构成新的类型
type TB = Pick<ITest, 'a'>

// 所有的属性变成可选
type TC = Partial<ITest>

// 所有属性变为必选
type TD = Required<ITest>
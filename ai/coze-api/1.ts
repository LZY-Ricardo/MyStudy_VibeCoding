// 在这里，您可以通过 'params'  获取节点中的输入变量，并通过 'ret' 输出结果
// 'params' 已经被正确地注入到环境中
// 下面是一个示例，获取节点输入中参数名为'input'的值：
// const input = params.input; 
// 下面是一个示例，输出一个包含多种数据类型的 'ret' 对象：
// const ret = { "name": '小明', "hobbies": ["看书", "旅游"] };

const random = (start: number, end: number) => {
    const p = Math.random()
    return Math.floor(start * (1 - p) + end * p)
}

async function main({ params }: Args): Promise<Output> {
    let { style, uniform_number, uniform_color, position, shooting_hand } = params
    if (position === null) {
        position = random(0, 3)
    }
    if (shooting_hand === null) {
        shooting_hand = random(0, 2)
    }


    style = style || '写实';
    uniform_number = uniform_number || 10;
    uniform_color = uniform_color || '红色';
    position = position == 0 ? '守门员' : (position == 1 ? '前锋' : '后卫');
    shooting_hand = shooting_hand == 0 ? '左手' : '右手';



    // 构建输出对象
    const ret = {
        style,
        uniform_number,
        uniform_color,
        position,
        shooting_hand,
    };

    return ret;
}
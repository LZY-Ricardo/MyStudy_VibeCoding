// 天气查询（模拟）
function get_weather(input: Record<string, string>): string {
    const data: Record<string, string> = {
        北京: '晴，22°C，东南风 3 级，空气质量良',
        上海: '小雨，18°C，东风 4 级，空气质量优',
        广州: '多云，28°C，南风 2 级，空气质量良',
        深圳: '阵雨，27°C，东南风 3 级，空气质量优',
        成都: '阴，16°C，静风，空气质量中',
    }
    const city = input['city'] ?? ''
    return data[city] ?? `暂无 ${city} 的天气数据`
}

export default get_weather
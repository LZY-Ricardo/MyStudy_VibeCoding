// 网页搜索模拟
function search_web(input: Record<string, string>): string { 
    const query = input['query'] ?? ''
    const result: Record<string, string> = {
        '户外运动 最佳温度': '户外运动最佳温度：跑步 15-22°C，骑行 10-25°C，登山 8-20°C',
        '小雨 跑步': '小雨天气跑步：轻微小雨（降水量<2mm/h）可以跑步，建议穿防水外套',
        '空气质量 运动': '空气质量建议：优良可正常运动，中等减少强度，差避免户外运动',
    }
    // 简单关键词匹配
    for (const [key, value] of Object.entries(result)) { 
        if (key.split(' ').some(k => query.includes(k))) { 
            return value
        }
    }
    return `搜索"${query}"：未找到相关结果`
}

export default search_web
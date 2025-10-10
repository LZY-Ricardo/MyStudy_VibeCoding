import express from 'express'
import { pipeline, env, AutoTokenizer, AutoModelForSequenceClassification } from '@huggingface/transformers'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())

// 配置环境
env.allowLocalModels = true
env.allowRemoteModels = false
env.useBrowserCache = false
env.localModelPath = path.resolve(__dirname, '..')

// 初始化模型
let tokenizer, model;
const initModel = async () => {
    console.log('正在加载本地模型...');
    try {
        const modelPath = path.resolve(__dirname, '../onnx_model')
        console.log('模型路径:', modelPath)

        // 加载 tokenizer 和模型
        tokenizer = await AutoTokenizer.from_pretrained(modelPath, {
            local_files_only: true
        })

        model = await AutoModelForSequenceClassification.from_pretrained(modelPath, {
            local_files_only: true
        })

        console.log('模型加载完成');
    } catch (error) {
        console.error('模型加载失败:', error);
        throw error;
    }
}

// api
app.post('/api/sentiment', async (req, res) => {
    const { text } = req.body
    if (!text) {
        return res.status(400).json({ error: '请输入文本' })
    }

    if (!tokenizer || !model) {
        return res.status(503).json({ error: '模型尚未加载完成' })
    }

    try {
        // 对文本进行编码
        const inputs = await tokenizer(text, {
            padding: true,
            truncation: true,
            max_length: 512
        })

        console.log('输入文本:', text)
        console.log('tokenizer 输出 keys:', Object.keys(inputs))

        // 模型推理
        const outputs = await model(inputs)

        console.log('='.repeat(50))
        console.log('模型输出类型:', typeof outputs)
        console.log('模型输出 keys:', Object.keys(outputs))

        // 获取 logits tensor
        let logitsTensor = null

        // 方式1: outputs.logits
        if (outputs.logits) {
            console.log('找到 outputs.logits')
            logitsTensor = outputs.logits
        }
        // 方式2: outputs.attentions (ONNX 模型可能放这里)
        else if (outputs.attentions && outputs.attentions.length > 0) {
            console.log('在 outputs.attentions 中查找')
            logitsTensor = outputs.attentions[0]
        }
        // 方式3: 直接是输出
        else if (outputs.dims && outputs.data) {
            console.log('outputs 本身就是 tensor')
            logitsTensor = outputs
        }

        if (!logitsTensor) {
            throw new Error('无法找到 logits tensor')
        }

        console.log('logitsTensor:', logitsTensor)

        // 从 tensor 中提取数据
        let logitsData, dims

        // 处理 ort_tensor 格式 (ONNX Runtime)
        if (logitsTensor.ort_tensor) {
            console.log('使用 ort_tensor 格式')
            const ortTensor = logitsTensor.ort_tensor
            dims = ortTensor.dims

            // cpuData 可能是对象 {"0": val1, "1": val2}
            if (ortTensor.cpuData) {
                const cpuData = ortTensor.cpuData
                console.log('cpuData 类型:', typeof cpuData)
                console.log('cpuData:', cpuData)

                // 对象格式转数组
                if (typeof cpuData === 'object' && !Array.isArray(cpuData)) {
                    const keys = Object.keys(cpuData).map(k => parseInt(k)).sort((a, b) => a - b)
                    logitsData = keys.map(k => cpuData[k.toString()])
                    console.log('从对象转换的数组:', logitsData)
                } else {
                    logitsData = Array.from(cpuData)
                }
            }
        }
        // 处理标准格式
        else if (logitsTensor.data) {
            console.log('使用标准 tensor 格式')
            logitsData = Array.from(logitsTensor.data)
            dims = logitsTensor.dims || logitsTensor.size
        }

        if (!logitsData) {
            throw new Error('无法提取 logits 数据')
        }

        console.log('logits dims:', dims)
        console.log('logits data:', logitsData)

        // 如果是二维 [batch_size, num_labels]，取第一个样本
        let logitsArray
        if (dims && dims.length === 2) {
            const numLabels = dims[1]
            logitsArray = logitsData.slice(0, numLabels)
        } else {
            logitsArray = logitsData
        }

        console.log('最终 logits 数组:', logitsArray)

        // 计算 softmax
        const scores = softmax(logitsArray)
        console.log('softmax 分数:', scores)

        // 获取最高分的索引
        const maxIndex = scores.indexOf(Math.max(...scores))
        const label = model.config.id2label[maxIndex]
        const score = scores[maxIndex]

        const result = [{
            label: label,
            score: score
        }]

        console.log('最终分析结果:', result)
        console.log('='.repeat(50))
        res.json(result)
    } catch (error) {
        console.error('模型推理错误:', error)
        console.error('错误堆栈:', error.stack)
        res.status(500).json({ error: '模型推理错误: ' + error.message })
    }
})

// Softmax 函数
function softmax(arr) {
    const maxLogit = Math.max(...arr)
    const scores = arr.map(l => Math.exp(l - maxLogit))
    const sum = scores.reduce((a, b) => a + b, 0)
    return scores.map(s => s / sum)
}

// 启动服务器
const port = 3000
app.listen(port, async () => {
    await initModel()
    console.log(`服务器运行在 http://localhost:${port}`)
})
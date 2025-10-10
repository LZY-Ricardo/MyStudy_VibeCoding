# Transformers.js 
将 Hugging Face 的 Transformers Python 库的功能迁移到 JS 环境中，以便在浏览器中运行。

24 年 10 月，v3版本发布，引入了WebGPU 支持，可以利用浏览器的 GPU 加速模型推理。

目前已经支持120多个模型，包括 BERT、GPT、T5 等，涵盖自然语言处理，视觉处理，音频处理等


# demo
1. 下载模型
```bash
python test.py
```

2. 将模型转换为 ONNX 格式
```bash
pip install "optimum[exporters]" onnx onnxruntime accelerate

optimum-cli export onnx \
  --model uer/roberta-base-finetuned-jd-binary-chinese \
  --task sequence-classification \
  --opset 14 \
  --sequence_length 128 \
  ../onnx_model
```

3. 启动服务器
```bash
node server.js
```
import { spawn } from 'child_process';

// 启动 server.js 子进程(服务端)
const serverProcess = spawn('node', ['server.js']);

// 监听子进程的标准输出 (服务端的响应)
serverProcess.stdout.on('data', (data) => {
    console.log('子进程的输出:', data.toString().trim());
});

// 测试消息
const messages = ['你好吗', '你认识胡建华吗', '不认识也没关系']

messages.forEach((msg, index) => {
    setTimeout(() => {
        // 向子进程的标准输入写入消息
        console.log(`user：${msg}`);
        serverProcess.stdin.write(`${msg}\n`);
    }, index * 1000)
})
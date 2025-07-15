import express from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config({
    path: ['.env.local', '.env'],
})

const app = express()
const port = 3000

async function authKlingai() {
    const headers = {
        algorithm: 'HS256',
    }
    const now = Math.floor(Date.now() / 1000)
    const payload = {
        iss: process.env.ACCESS_KEY_ID,
        exp: now + 60 * 30 * 24,
        nbf: now - 5,
    }
    // 用 keling 的 密钥 来生成一个令牌
    const token = jwt.sign(payload, process.env.ACCESS_KEY_SECRET, headers)
    return token
}

// 定义了一个 get 接口
// 接口的路径是 /jwt-auth
// 接口的功能是返回一个 jwt 令牌
app.get('/jwt-auth', async (req, res) => {
    const token = await authKlingai()
    res.send(token)
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    
})
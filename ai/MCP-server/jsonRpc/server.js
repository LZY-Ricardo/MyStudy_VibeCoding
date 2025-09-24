import utils from './utils.js'

process.stdin.on('data', (data) => {
    const req = JSON.parse(data)
    const funcName = req.method
    const params = req.params
    const res = utils[funcName](params)
    const resp = {
        jsonrpc: '2.0',
        result: res,
        id: req.id
    }
    process.stdout.write(JSON.stringify(resp) + '\n')
})
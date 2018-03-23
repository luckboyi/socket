let server = http.createServer()
let url = require('url')
server.on('connection',(socket) => console.log('客户端链接'))
server.on('request',(req,res) => {
    let { pathname, query} = url.parse(req.url, true)
    let result = []
    req.on('data', (data) => {
        result.push(data)
    })
    req.on('end',() => {
        let r= Buffer.concat(result)
        res.end(r)
    })  
})

server.on('close', (req,res) => console.log('服务器关闭'))
server.on('error',(err) => console.log('服务器错误'))
server.listen(8877, () => console.log('server started at http://localhost:8877'))
const fs = require('fs'),
    ping = require('net-ping'),
    restify = require('restify'),
    server = restify.createServer()

const ARG_1 = 2
console.log('ARG: %s', process.argv[2])
const Config = JSON.parse(fs.readFileSync(process.argv[ARG_1]))

server.get('/ping/:host', (req, res, next) => {
    PingAsync(req.params.host).then(() => {
        res.send({
            status: 'OK',
            description: req.params.host + ' is alive'
        })
    }).catch((err) => {
        res.send({
            status: 'ERROR',
            description: err.name
        })
    }).finally(() => {
        next()
    })
})

let session = ping.createSession()
session.pingHost(Config.service.TEST_HOST, (err, tgt) => {
    if (err)
        console.log(err)
    else {
        console.log('%s is alive', Config.service.TEST_HOST)
        server.listen(Config.service.PORT, () => {
            console.log('Listening at %s, %s', server.name, server.url)
        })
    }
})

function PingAsync(host) {
    return new Promise((resolve, reject) => {
        let session = ping.createSession({
            timeout: 500
        })
        session.pingHost(host, (err, tgt) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })        
    })
}

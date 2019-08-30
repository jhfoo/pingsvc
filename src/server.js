const fs = require('fs'),
    ping = require('net-ping'),
    restify = require('restify'),
    server = restify.createServer(),
    {
        ConfigReader
    } = require('foobelt')

const ARG_1 = 2
const Config = ConfigReader(process.argv[ARG_1])

// load restify plugins
server.use(restify.plugins.queryParser({
    mapParams: false
}));

server.get('/ping/:host', (req, res, next) => {
    let opt = {
        timeout: req.query.timeout ? req.query.timeout : null
    }
    PingAsync(req.params.host, opt).then(() => {
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

// test service once ping test passes
PingAsync(Config.service.TEST_HOST, {
    timeout: 2 * 1000
}).then(() => {
    console.log('%s is alive', Config.service.TEST_HOST)
    server.listen(Config.service.PORT, () => {
        console.log('Listening at %s, %s', server.name, server.url)
    })
}).catch((err) => {
    console.log(err)
})

function PingAsync(host, opt) {
    return new Promise((resolve, reject) => {
        let session = ping.createSession({
            timeout: opt.timeout ? opt.timeout : Config.DEF_TIMEOUT
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
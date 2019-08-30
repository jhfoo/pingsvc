module.exports = {
    service: {
        PORT: 8086,
        'TEST_HOST': "192.168.0.2"
    },
    DEF_TIMEOUT: 500,
    production: {
        service: {
            PORT: 8085,
            'TEST_HOST': "192.168.0.1"
        }
    }
}
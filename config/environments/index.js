module.exports = {
    development: {
        db: 'mongodb://mock:server2@ds149754.mlab.com:49754/mock-server',
        jwt: {
            secretOrKey: process.env.SECRET || 'SECRET',
            algorithm: 'HS256',
            expiresIn: '24h',
            issuer: 'jonu',
            audience: 'not sure',
        }
    },
    production: {
        db: 'mongodb://mock:server2@ds149754.mlab.com:49754/mock-server',
        jwt: {
            secretOrKey: process.env.SECRET || 'SECRET',
            algorithm: 'HS256',
            expiresIn: '1h',
            issuer: 'jonu',
            audience: 'not sure',
        }
    }, 
    test: {
        db: 'mongodb://mock:server2@ds149754.mlab.com:49754/mock-server',
        jwt: {
            secretOrKey: 'TEST_SECRET',
            algorithm: 'HS256',
            expiresIn: '1h',
            issuer: 'jonu tEST',
            audience: 'YOU',
        }
    }
}[process.env.NODE_ENV || 'development'];

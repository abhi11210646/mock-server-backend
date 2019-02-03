module.exports = {
    development: {
        db: process.env.DB_DEV,
        jwt: {
            secretOrKey: process.env.SECRET || 'SECRET',
            algorithm: 'HS256',
            expiresIn: '24h',
            issuer: 'jonu',
            audience: 'not sure',
        }
    },
    production: {
        db: process.env.DB_LIVE,
        jwt: {
            secretOrKey: process.env.SECRET || 'SECRET',
            algorithm: 'HS256',
            expiresIn: '1h',
            issuer: 'jonu',
            audience: 'not sure',
        }
    }, 
    test: {
        db: process.env.DB_TEST,
        jwt: {
            secretOrKey: 'TEST_SECRET',
            algorithm: 'HS256',
            expiresIn: '1h',
            issuer: 'jonu tEST',
            audience: 'YOU',
        }
    }
}[process.env.NODE_ENV || 'development'];

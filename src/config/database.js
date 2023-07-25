module.exports = {
    development: {
        hostname: 'localhost',
        username: process.env.USERNAME || 'root',
        password: process.env.PASSWORD || null,
        database: process.env.DATABASE,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    production: {
        hostname: 'localhost',
        username: process.env.USERNAME || 'root',
        password: process.env.PASSWORD || null,
        database: process.env.DATABASE,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
    
}
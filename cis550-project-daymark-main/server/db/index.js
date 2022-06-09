const { Pool } = require('pg')

const credentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

const pool = new Pool(credentials);

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}
// config/dbConfig.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '92.112.194.1',
    user: 'zuux',
    password: '07Enz@Gang08',
    database: 'food_info',
    connectionLimit: 5,
    connectTimeout: 20000
});

pool.getConnection()
    .then(conn => {
        console.log("Connected to the database successfully!");
        conn.release();
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err.message);
    });

module.exports = pool;

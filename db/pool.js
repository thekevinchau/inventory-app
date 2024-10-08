const {Pool} = require('pg');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const DB_URI = process.env.DB_URI;

console.log(DB_URI);

module.exports = new Pool({
    connectionString: DB_URI
})


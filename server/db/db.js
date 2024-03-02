// import Pool  from 'pg-pool'
import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
})
const client = await pool.connect();

export default client;


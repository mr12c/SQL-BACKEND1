import mysql from 'mysql2'
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
const sslCertPath = path.resolve('DigiCertGlobalRootCA.crt.pem');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_URL,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'vishal',
  // set ssl required and set it location
  
  
  ssl: { ca: fs.readFileSync(sslCertPath) },
 
 
 
  
  
  
  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  connectTimeout: 30000
});











// For promises
const connectDb = pool.promise();

export default connectDb;

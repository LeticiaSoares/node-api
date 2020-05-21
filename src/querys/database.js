import mysql from 'mysql'

const database = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Crashsite@4131'
});


export default database

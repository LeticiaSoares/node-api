import database from "./database";

function queryDB(sql, args){
    return new Promise((resolve, reject) => {
        database.query(sql, args, (err, rows) => {
            if (err)
                return reject(err);
            rows || rows.changedRows || rows.affectedRows || rows.insertId ? resolve(JSON.parse(JSON.stringify(rows))) : resolve([]);
        });
    })
}

const querys ={
    loginUser: ({email,password}) => queryDB("select * from todolist.users u where u.email = ? and u.password = ? ",[email,password]).then(data => data),
    setSessionId : ({ session_id,id }) => queryDB("update todolist.users SET session_id = ? where id = ?", [session_id, id]).then(data => data),
    getList: (user_id) => queryDB("select * from todolist.list l where l.user_id = ?",[user_id]).then(data => data),
    createTodo: (args) => queryDB( "insert into todolist.list SET ?", [args]).then(data=>data),
}

module.exports =querys


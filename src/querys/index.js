import database from "./database";

function queryDB(sql, args){
    return new Promise((resolve, reject) => {
        database.query(sql, args, (err, rows) => {
            if (err)
                return reject(err);
            rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
        });
    })
}

const querys ={
    getList: () => queryDB("select * from todolist.list u"),
    getUserInfo: async ({ name }) => {
        const variable = `%${name}%`
        return  queryDB( "select * from users.users u  where  u.name like ?",variable).then(data => data)
    },
    updateUserInfo: (args) => queryDB("update users.users SET ? where id = ?", [args, args.id]).then(data => data),
    createUser: (args) =>{
        console.log('args',args)
        return queryDB( "insert into todolist.list SET ?", args)
    },
    deleteUser: (args) => queryDB( "delete from users.users where id = ?", [args.id]).then(data => data),
}

module.exports =querys


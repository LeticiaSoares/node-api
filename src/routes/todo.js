import querys from '../querys'

function create(req, res) {
    try{
        const header = req.headers
        console.log('header',req.headers)
        console.log('authorization',header.authorization)
        console.log('user-id',header['user-id'])
        // if(!validUser(authorization, res)){
        //     return
        // }
        // querys.createTodo(req.body).then((data)=>{
        //     if(data){
        //         res.status(201).send(JSON.stringify(data));
        //     }else{
        //         res.status(500).send({ msg : "Internal Server Error"})
        //     }
        // })
    }catch (e) {
        return res.status(500).send({ msg : "Internal Server Error"})
    }
}

function getList(req, res) {
    try{
        const authorization = req.headers.authorization
        console.log('authorization',authorization)
        const user_id = req.param('user_id')
        if(!validUser(authorization, res)){
            return
        }
        querys.getList(user_id).then((data)=>{
            if(data){
                res.status(201).send(JSON.stringify(data));
            }else{
                res.status(500).send({ msg : "Internal Server Error"})
            }
        })
    }catch (e) {
        return res.status(500).send({ msg : "Internal Server Error"})
    }

}

function validUser(user, res) {
    if (!user) {
        res.status(400).send({msg: "Authorization is required in header"})
        return false;
    }
    return true;
}

module.exports = {
    create,
    getList
}


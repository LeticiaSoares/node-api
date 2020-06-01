import querys from '../querys'

function setSessionId(data){
    return querys.setSessionId(data).then((result)=>{
        return result.affectedRows
    })
}
function login(req, res) {
    try{
        const user = req.body
        const header = req.headers
        querys.loginUser(user).then(async (data)=>{
            if(data.length >0){
                const randomNumber=Math.random().toString();
                const session_id =randomNumber.substring(2,randomNumber.length);
                const result =await setSessionId({session_id : session_id, id : data[0].id})
                if(result){
                    return res.status(201).send({msg:"Login Efetuado com Sucesso"});
                }else{
                    return res.status(404).send({ msg : "Not Found"})
                }
            }else{
                return res.status(404).send({ msg : "Not Found"})
            }
        })
    }catch (e) {
        return res.status(500).send({ msg : "Internal Server Error"})
    }
}

function validUser(user, res) {
    if (!user) {
        res.status(400).send({msg: "user is required in header"})
        return false;
    }
    return true;
}

function getUser(req) {
    return req.get("user")
}

module.exports = {
    login
}


import querys from '../querys'

function save(req, res) {
    try{
        console.log('req body',req.body)
        const todo = req.body
        const user = getUser(req)
        if(!validUser(user, res)){
            return
        }
        console.log("Saving todo:" + todo)
        querys.createUser(todo).then((data)=>{
            if(data){
                res.status(201).send({msg:"Item salvo"});
            }else{
                res.status(500).send({ msg : "Internal Server Error"})
            }
        })
    }catch (e) {
        return res.status(500).send({ msg : "Internal Server Error"})
    }

}

function getList(req, res) {
    try{
        const user = getUser(req)
        if(!validUser(user, res)){
            return
        }
        querys.getList().then((data)=>{
            if(data){
                console.log('data',JSON.stringify(data))
                res.status(201).send(JSON.stringify(data));
            }else{
                res.status(500).send({ msg : "Internal Server Error"})
            }
        })
    }catch (e) {
        return res.status(500).send({ msg : "Internal Server Error"})
    }

}
// function list(req, res) {
//     const db = mongo.getDb();
//     const user = getUser(req)
//     if(!validUser(user, res)){
//         return
//     }
//     db.collection("todo").find({"user": user}).toArray(function(err,docs) {
//         if (err != null) {
//             res.send(err);
//         } else {
//             res.status(200).send({todo:docs});
//         }
//     });
// }
//
// function update(req, res) {
//     const db = mongo.getDb();
//     const user = getUser(req)
//     const todo = req.body
//     const id = req.params.id
//     todo.user = user
//     if(!validUser(user, res)){
//         return
//     }
//     db.collection("todo").findOneAndUpdate({_id: ObjectID(id)}, {$set: todo}, {
//         returnOriginal: false
//     },function(err,r) {
//         if (err != null) {
//             res.send(err);
//         } else {
//             res.status(200).send({msg:"todo atualizad", doc: r.value});
//         }
//     });
// }
//
// function remove(req, res) {
//     const db = mongo.getDb();
//     const user = getUser(req)
//     const id = req.params.id
//     if(!validUser(user, res)){
//         return
//     }
//     db.collection("todo").findOneAndDelete({_id: ObjectID(id), user: user},function(err,r) {
//         if (err != null) {
//             res.send(err);
//         } else {
//             console.log(r)
//             if (!r.value) {
//                 res.status(404).send();
//             } else {
//                 res.status(200).send({msg:"Deleted"});
//             }
//         }
//     });
// }

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
    save,
    getList
}


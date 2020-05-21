import todo from "./routes/todo";
import express from 'express';
import database from "./querys/database"

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.post("/todo-api/todo", todo.save);
app.get("/todo-api/list", todo.getList);
// app.put("/todo-api/todo/:id", todo.update);
// app.delete("/todo-api/todo/:id", todo.remove);


const PORT = process.env.PORT || 3000;
database.connect();
app.listen(PORT, () => console.log("Listening on port " + PORT));

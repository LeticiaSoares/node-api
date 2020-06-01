import todo from "./routes/todo";
import user from "./routes/user";
import express from 'express';
import cookieParser from 'cookie-parser'
import database from "./querys/database"

const app = express();
app.get("/ping", (req, res) => {
    res.send("pong");
});
app.post("/todo-api/login",user.login);
app.get("/todo-api/list", todo.getList);
app.post("/todo-api/list", todo.create);

const PORT = process.env.PORT || 3001;
database.connect();
app.listen(PORT, () => console.log("Listening on port " + PORT));

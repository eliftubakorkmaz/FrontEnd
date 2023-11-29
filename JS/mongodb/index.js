const uri = "mongodb+srv://etubas:no2212wol@testdb.u85b4ow.mongodb.net/";

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const response = require("./services/response");
var Schema = mongoose.Schema;

app.use(cors());
app.use(express.json());

mongoose.connect(uri).then(res => {
    console.log("Connection is succesfull")
});

const todoSchema = new Schema({
    _id: String,
    work: String,
    isCompleted: Boolean
    //name: String
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/api/getall", async(req,res) => {
    response(res, async()=> {
        const result = await Todo.find({}); // select * from Todos where Id=1
        res.json(result);
    });

    // try {
    //     const result = await Todo.find({}); // select * from Todos where Id=1
    //     res.json(result);
    // } catch (error) {
    //     res.status(500).json({message: error})
    // }
})

app.get("/api/add", async(req, res) => {
    response(res, async() => {
        const todo = new Todo();
        todo._id = "1";
        todo.work = "Deneme";
        todo.isCompleted = true

        await todo.save();
        res.json({message: "Create is successfull"})
    })

    // try {
    //     const todo = new Todo();
    //     todo._id = "1";
    //     todo.work = "Deneme";
    //     todo.isCompleted = true

    //     await todo.save();
    //     res.json({message: "Create is successfull"})

    // } catch (error) {
    //     res.status(500).json(error)
    // }
})

app.get("/api/removeById", async(req,res) => {
    response(res, async()=> {
        await Todo.findByIdAndDelete("1");
        res.json({message: "Remove is Successfull"});
    })

    // try {
    //     await Todo.findByIdAndDelete("1");
    //     res.json({message: "Remove is Successfull"});
    // } catch (error) {
    //     res.status(500).json(error)
    // }
})

app.listen("5000", () => console.log("http://localhost:5000 port üzerinde ayakta"));

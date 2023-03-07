const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const {v4:uuidv4} = require("uuid");

router.get("/getAll", async (req, res)=>{
    try {
        const todos = await Todo.find({}).sort({date: -1});
        res.json(todos);
    } catch (error) {
        res.status(400).json({message: error.message });
    }
});

router.post("/add", async (req, res)=>{
    try {
        const name = req.body.name;
        const todo = new Todo();
        todo.name = name;
        todo.date = new Date();
        todo._id = uuidv4();

        await todo.save();
        res.json({message: "Kayıt işlemi başarılı"});
    } catch (error) {
        res.status(400).json({message: error.message });
    }
});

router.post("/removeById", async(req, res)=>{
    try {
        const _id = req.body._id;
        await Todo.findByIdAndRemove(_id);
        res.json({message: "Silme işlemi başarılı"});
    } catch (error) {
        res.status(400).json({message: error.message });
    }
});


router.post("/updateById", async(req, res)=>{
    try {
        const _id = req.body._id;
        const todo = await Todo.findById(_id);
        todo.isCompleted = !todo.isCompleted;
        await Todo.findByIdAndUpdate(_id,todo);

        res.json({message: "Güncelleme işlemi başarılı"});
    } catch (error) {
        res.status(400).json({message: error.message });
    }
});

module.exports = router;

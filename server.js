const express = require('express');
const PORT = 3000;

const app = express();
const productRoutes = require('./routes');

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://fornewstack:dmsgud32@cluster0.88jrk7e.mongodb.net/tdd?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(() => console.log("MongoDB connected..."))
    .catch(err => console.log("error"));

app.use("/api/products", productRoutes);
// 특정 요청이 api/products로 온다면 productRoutes로 보낸다

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT);
console.log(`Running on ${PORT}`);
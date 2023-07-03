const express = require('express');
const PORT = 3000;

const app = express();
const productRoutes = require('./routes');

const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect("mongodb+srv://fornewstack:dmsgud32@cluster0.88jrk7e.mongodb.net/tdd?retryWrites=true&w=majority", {
            useNewUrlParser: true
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
})();

app.use(express.json());
// 이 middleware를 통해 response.body에 newProduct data가 들어감

app.use("/api/products", productRoutes);
// 특정 요청이 api/products로 온다면 productRoutes로 보낸다

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message })
})

// app.listen(PORT);
// console.log(`Running on ${PORT}`);

module.exports = app;
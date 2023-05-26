// node.js에서는 require == import
const express = require("express");

const PORT = 3000;

const app = express();
const productRoutes = require("./routes/products")
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://fornewstack:dmsgud32@cluster0.88jrk7e.mongodb.net/tdd?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// endpoint가 /api/products/sth인 경우 productRoutes로 보내준다
app.use("/api/products", productRoutes);

app.use = (express.json());
app.get("/", (req, res) => {
    res.send("hello eh-lee")
});

app.listen(PORT);
console.log(`Running on PORT ${PORT}`);
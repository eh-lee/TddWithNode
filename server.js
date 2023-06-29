const express = require('express');
const PORT = 3000;

const app = express();
const productRoutes = require('./routes');

app.use("/api/products", productRoutes);
// 특정 요청이 api/products로 온다면 productRoutes로 보낸다

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT);
console.log(`Running on ${PORT}`);
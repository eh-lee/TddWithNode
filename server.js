const express = require('express');

const PORT = 5000;
// const HOST = '0.0.0.0';

//App
const app = express();
app.get('/', (req, res) => {
    res.send("Hello World");
});

// app.listen(PORT, HOST);
app.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
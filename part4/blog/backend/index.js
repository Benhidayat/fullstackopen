const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
});

app.listen(3002, () => {
    console.log(`Server is running on http://localhost:3002`);
})
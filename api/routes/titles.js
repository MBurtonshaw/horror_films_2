const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.send({"message" : "Titles!"})
});

module.exports = app;
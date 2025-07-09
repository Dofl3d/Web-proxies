const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use('/admin', express.static(path.join(__dirname, 'hidden')));

app.get('/proxy', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).send("Missing URL");

    try {
        const response = await axios.get(url);
        res.status(200).send(response.data);
    } catch (err) {
        res.status(404).send("Not found or blocked.");
    }
});

app.listen(port, '0.0.0.0', () => console.log(`Challenge running on port ${port}`));


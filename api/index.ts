const express = require("express");
const cors = require('cors');
const secure = require('ssl-express-www');
const path = require('path');
const app = express();
const { color } = require('../lib/color.js');

app.enable('trust proxy');
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/index.html'));
});

app.get('/dosc', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/dosc.html'));
});

app.use('/api', require("./api.ts"));

app.get('/config', (req, res) => {
    const config = {
        status: true,
        result: {
            prefix: '.',
            namabot: 'Ceria-Bot',
            namaowner: 'Wann',
            instagram: 'irwns23_',
            youtube: 'Gak Punya'
        }
    };
    res.json(config);
});

const port = 3000;
app.listen(port, () => {
    console.log(color(`Server running on port ${port}`, 'green'));
});

module.exports = app;

const express = require("express"),
	cors = require('cors'),
	secure = require('ssl-express-www');
const app = express();
const path = require('path');
var { color } = require('../lib/color.js')

app.enable('trust proxy');
app.set("json spaces", 2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../view/index.html'));
	
});
app.get('/dosc', function (req, res) {
	res.sendFile(path.join(__dirname, '../view/dosc.html'));
});
app.use('/api', require(path.join(__dirname, './api.ts')));

app.listen(3000, () => console.log(color("Server running on port 3000",'green')));

module.exports = app;

const express = require("express"),
	cors = require('cors'),
	secure = require('ssl-express-www');
const app = express();
const path = require('path');

app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../view/index.html'));
});
app.get('/dosc', function (req, res) {
	res.sendFile(path.join(__dirname, '../view/dosc.html'));
});
app.use('/api', require("./api.js"));


app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;

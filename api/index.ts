const express = require("express");
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname,'../view/index.html'));
});
app.get("/api", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;

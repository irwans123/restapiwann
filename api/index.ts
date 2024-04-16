
const express = require("express");
const app = express();

app.get("/", (req, res) => res.sendFile('/views/index.html'));
app.get("/api", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;

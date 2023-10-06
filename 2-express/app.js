const path = require("node:path");
const express = require("express");
const homeRoute = require("./routes/home");
const usersRoute = require("./routes/users");

const app = express();
const port = process.env.PORT ?? 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", homeRoute);
app.use("/api/users", usersRoute);

app.listen(port, () => console.log(`listening on port ${port}`));

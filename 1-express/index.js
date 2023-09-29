let users = require("./usersList");
const path = require("node:path");
const express = require("express");
const { query, body, validationResult } = require("express-validator");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");

const app = express();
const port = process.env.PORT ?? 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

// $env:NODE_ENV="development"
// $env:NODE_ENV="production"
// console.log(config.get("name"));

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log('app.get("env"):', app.get("env"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.get("/", (req, res) => {
  res.render("home", { name: "bhzd" });
});

app.use((req, res, next) => {
  console.log("mid1");
  req.body.abc = "abc";
  req.user = { id: 1, name: "bhzd" };
  // res.send("mid1");
  next();
});
app.use((req, res, next) => {
  console.log("mid2");
  console.log(req.body, req.user);
  next();
});

app.get("/api/users", [query("person").notEmpty()], (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.status(200).json({ data: users, message: "ok" });
  }
  res.status(400).send({ errors: result.array() });
});

app.use((req, res, next) => {
  console.log("mid3");
  next();
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ data: null, message: "User not found" });
  }
  res.json({ data: user, message: "ok" });
});

app.post(
  "/api/users",
  [
    body("email", "email is invalid").isEmail(),
    body("first_name", "first name can ot be empty").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ data: null, errors, message: "validation error" });
    }
    users.push({ id: users.length + 1, ...req.body });
    res.status(200).json({ data: users, errors, message: "ok" });
  }
);
app.put(
  "/api/users/:id",
  [
    body("email", "email is invalid").isEmail(),
    body("first_name", "first name can ot be empty").notEmpty(),
  ],
  (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (!user) {
      return res.status(404).json({ data: null, message: "User not found" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ data: null, errors, message: "validation error" });
    }
    const newList = users.map((user) => {
      if (user.id === Number(req.params.id)) {
        return { ...user, ...req.body };
      }
      return user;
    });
    res.status(200).json({ data: newList, message: "ok" });
  }
);

app.delete("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ data: null, message: "User not found" });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.json({ data: users, message: "ok" });
});

app.listen(port, () => console.log(`listening on port ${port}`));

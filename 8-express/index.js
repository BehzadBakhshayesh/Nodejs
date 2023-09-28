let users = require("./usersList");
const express = require("express");
const { query, body, validationResult } = require("express-validator");

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

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

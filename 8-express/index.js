let users = require("./usersList");
const express = require("express");
const { query, body, validationResult } = require("express-validator");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/users", [query("person").notEmpty()], (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.status(200).json({ data: users, message: "ok" });
  }
  res.status(400).send({ errors: result.array() });
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
    console.log(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ data: null, errors, message: "validation error" });
    }
    users.push({ id: users.length + 1, ...req.body });
    res.status(200).json({ data: users, errors, message: "ok" });
  }
);

app.listen(port, () => console.log(`listening on port ${port}`));

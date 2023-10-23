let users = require("../usersList");
const express = require("express");
const { query, body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", [query("person").notEmpty()], (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.status(200).json({ data: users, message: "ok" });
  }
  res.status(400).send({ errors: result.array() });
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ data: null, message: "User not found" });
  }
  res.json({ data: user, message: "ok" });
});

router.post(
  "/",
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
router.put(
  "/:id",
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

router.delete("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ data: null, message: "User not found" });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.json({ data: users, message: "ok" });
});

module.exports = router;

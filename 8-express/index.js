let users = require("./usersList");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.json({ data: users, message: "ok" });
});
app.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ data: null, message: "User not found" });
  }
  res.json({ data: user, message: "ok" });
});

app.post("/api/users", (req, res) => {
  console.log("1:", req.body);
  res.json({ data: req.body, message: "ok" });
});

app.listen(port, () => console.log(`listening on port ${port}`));

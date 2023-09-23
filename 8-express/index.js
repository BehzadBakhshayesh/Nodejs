require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/users", (req, res) => {
  res.send([
    { id: 1, name: "user1" },
    { id: 2, name: "user2" },
    { id: 3, name: "user3" },
  ]);
});
app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  res.send([{ id: req.params.id, name: `user${req.params.id}` }]);
});

// app.post();

// app.put();

// app.delete();

app.listen(port, () => console.log(`listening on port ${port}`));

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));

let users = [];

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = { id: Date.now().toString(), ...req.body };
  users.push(newUser);
  res.json(newUser);
});

app.put("/users/:id", (req, res) => {
  users = users.map(u => u.id === req.params.id ? { ...u, ...req.body } : u);
  res.json({ message: "Updated" });
});

app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id !== req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});

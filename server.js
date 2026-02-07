const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());

// ✅ Allow BOTH React ports
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

let users = [];

// ---------- ROUTES ----------

// test route
app.get("/", (req, res) => {
  res.send("Backend is running! Use /users for API.");
});

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// CREATE
app.post("/users", (req, res) => {
  const newUser = { id: Date.now().toString(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;

  users = users.map((u) =>
    u.id === id ? { ...u, ...req.body } : u
  );

  res.json({ message: "User updated" });
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((u) => u.id !== id);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

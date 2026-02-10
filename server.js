const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// In-memory DB (Render restart झाला की clear होईल)
let users = [];

// Health check
app.get("/", (req, res) => {
  res.send("Backend running on Render 🚀");
});

// Get all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// Ensure OPTIONS (CORS preflight) works
app.options("/users", cors());

// Create user
app.post("/users", (req, res) => {
  try {
    const newUser = {
      id: Date.now().toString(),
      ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "User create failed" });
  }
});

// Update user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.map(u => u.id === id ? { ...u, ...req.body } : u);
  res.json({ message: "User updated" });
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

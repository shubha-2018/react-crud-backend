const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   Middleware
========================= */

app.use(express.json());

// 🔥 Open CORS for all devices & browsers
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 Allow preflight requests (important for mobile)
app.options("*", cors());

/* =========================
   In-memory Database
========================= */
let users = [];

/* =========================
   Routes
========================= */

// Health check
app.get("/", (req, res) => {
  res.send("Backend running on Render 🚀");
});

// Get all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// Create user
app.post("/users", (req, res) => {
  try {
    const newUser = {
      id: Date.now().toString(),
      ...req.body,
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

  users = users.map((u) =>
    u.id === id ? { ...u, ...req.body } : u
  );

  res.json({ message: "User updated" });
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((u) => u.id !== id);

  res.json({ message: "User deleted" });
});

/* =========================
   Start Server
========================= */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

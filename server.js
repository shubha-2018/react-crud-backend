const express = require("express");
const cors = require("cors");

const app = express();

// Render / Production साठी PORT dynamic हवा
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ Production + Local React दोन्ही allow
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://react-crud-app-blond-alpha.vercel.app"   // 👈 तुमचा Vercel URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ⚠️ In-memory DB (Render restart झाला की clear होईल)
let users = [];

// ---------- ROUTES ----------

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running on Render 🚀");
});

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// CREATE user
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

// UPDATE user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;

  users = users.map((u) =>
    u.id === id ? { ...u, ...req.body } : u
  );

  res.json({ message: "User updated successfully" });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((u) => u.id !== id);

  res.json({ message: "User deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

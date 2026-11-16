require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Bhojpuri Music API is running"));
app.use("/api/singers", require("./routes/singers"));
app.use("/api/songs", require("./routes/songs"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/me", require("./routes/me"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("DB error:", err.message));
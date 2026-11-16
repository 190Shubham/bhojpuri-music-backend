const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const makeToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6)
    return res.status(400).json({ error: "Name, email and password (6+ chars) required" });
  if (await User.findOne({ email }))
    return res.status(400).json({ error: "Email already registered" });

  const user = await User.create({
    name, email, password: await bcrypt.hash(password, 10),
  });
  res.status(201).json({ token: makeToken(user), user: { id: user._id, name, email } });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: (req.body.email || "").toLowerCase() });
  if (!user || !(await bcrypt.compare(req.body.password || "", user.password)))
    return res.status(400).json({ error: "Wrong email or password" });
  res.json({ token: makeToken(user), user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;
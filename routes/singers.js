const router = require("express").Router();
const Singer = require("../models/Singer");
const Song = require("../models/Song");

// GET /api/singers or /api/singers?gender=female
router.get("/", async (req, res) => {
  const filter = req.query.gender ? { gender: req.query.gender } : {};
  res.json(await Singer.find(filter).sort("name"));
});

// GET /api/singers/:id  (singer + their songs)
router.get("/:id", async (req, res) => {
  const singer = await Singer.findById(req.params.id);
  if (!singer) return res.status(404).json({ error: "Singer not found" });
  const songs = await Song.find({ singer: singer._id });
  res.json({ singer, songs });
});

// POST /api/singers
router.post("/", async (req, res) => {
  res.status(201).json(await Singer.create(req.body));
});

module.exports = router;
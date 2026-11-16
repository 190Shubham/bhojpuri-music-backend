const router = require("express").Router();
const Song = require("../models/Song");

// GET /api/songs?search=holi&tag=wedding
router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.search) filter.title = new RegExp(req.query.search, "i");
  if (req.query.tag) filter.tags = req.query.tag;
  res.json(await Song.find(filter).populate("singer").limit(50));
});

// POST /api/songs
router.post("/", async (req, res) => {
  res.status(201).json(await Song.create(req.body));
});

// POST /api/songs/:id/play  (count a play)
router.post("/:id/play", async (req, res) => {
  const song = await Song.findByIdAndUpdate(
    req.params.id, { $inc: { plays: 1 } }, { new: true }
  );
  res.json(song);
});

module.exports = router;
const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

router.use(auth);

// liked songs
router.get("/likes", async (req, res) => {
  const user = await User.findById(req.userId).populate({
    path: "likedSongs", populate: "singer",
  });
  res.json(user.likedSongs);
});

router.post("/likes/:songId", async (req, res) => {
  await User.findByIdAndUpdate(req.userId, { $addToSet: { likedSongs: req.params.songId } });
  res.json({ liked: true });
});

router.delete("/likes/:songId", async (req, res) => {
  await User.findByIdAndUpdate(req.userId, { $pull: { likedSongs: req.params.songId } });
  res.json({ liked: false });
});

// playlists
router.get("/playlists", async (req, res) => {
  const user = await User.findById(req.userId).populate({
    path: "playlists.songs", populate: "singer",
  });
  res.json(user.playlists);
});

router.post("/playlists", async (req, res) => {
  const user = await User.findById(req.userId);
  user.playlists.push({ name: req.body.name, songs: [] });
  await user.save();
  res.status(201).json(user.playlists[user.playlists.length - 1]);
});

router.post("/playlists/:pid/songs/:songId", async (req, res) => {
  const user = await User.findById(req.userId);
  const pl = user.playlists.id(req.params.pid);
  if (!pl) return res.status(404).json({ error: "Playlist not found" });
  if (!pl.songs.some((s) => s.equals(req.params.songId))) pl.songs.push(req.params.songId);
  await user.save();
  res.json(pl);
});

module.exports = router;
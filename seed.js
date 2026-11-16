require("dotenv").config();
const mongoose = require("mongoose");
const Singer = require("./models/Singer");
const Song = require("./models/Song");

const singers = [
  { name: "Pawan Singh", gender: "male" },
  { name: "Khesari Lal Yadav", gender: "male" },
  { name: "Manoj Tiwari", gender: "male" },
  { name: "Dinesh Lal Yadav", gender: "male" },
  { name: "Ritesh Pandey", gender: "male" },
  { name: "Sharda Sinha", gender: "female" },
  { name: "Kalpana Patowary", gender: "female" },
  { name: "Indu Sonali", gender: "female" },
  { name: "Priyanka Singh", gender: "female" },
  { name: "Shilpi Raj", gender: "female" },
];

// Free demo audio so the player works while you build.
// Replace with permitted audio or YouTube links later.
const demoUrl = (n) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;

const tags = [["holi"], ["wedding"], ["chhath"], ["sawan"], ["dance"]];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Song.deleteMany({});
  await Singer.deleteMany({});

  const created = await Singer.insertMany(singers);

  const songs = [];
  created.forEach((singer, i) => {
    for (let k = 1; k <= 2; k++) {
      songs.push({
        title: `Sample Song ${i * 2 + k}`,
        singer: singer._id,
        album: "Demo Album",
        duration: 200,
        sourceUrl: demoUrl(((i * 2 + k) % 16) + 1),
        tags: tags[(i + k) % tags.length],
      });
    }
  });

  await Song.insertMany(songs);
  console.log(`Added ${created.length} singers and ${songs.length} songs`);
  process.exit(0);
}

seed().catch((e) => { console.log(e.message); process.exit(1); });
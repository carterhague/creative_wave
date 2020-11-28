const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')


const upload = multer({
  dest: '/var/www/music.flaminglasers.com/images/',
  limits: {
    fileSize: 10000000
  }
};

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  soundpath: String,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Photo = mongoose.model('Photo', photoSchema);

// upload photo
router.post("/", validUser, upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'sound', maxCount: 1 }
]), async (req, res) => {
  // check parameters
  if (!req.files){
    console.log("HERE");
    return res.status(400).send({
      message: "Must upload files."
    });
  }

  let test = req.files.photo[0];
  const photo = new Photo({
    user: req.user,
    path: "/images/" + req.files.photo[0].filename,
    soundpath: "/images/" + req.files.sound[0].filename,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my photos
router.get("/", validUser, async (req, res) => {
  // return photos
  try {
    let photos = await Photo.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/all", async (req, res) => {
  try {
    let photos = await Photo.find().sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get single photos
router.get("/single", async (req, res) => {
  try {
    let id = req.query['id']
    let photo = await Photo.find({
      _id: id
    }).populate('user');
    return res.send(photo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Photo,
  routes: router,
}

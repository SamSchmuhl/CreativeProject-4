const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

app.use(express.static('public'));

const mongoose = require('mongoose');

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  profession: String,
  race: String,
  level: String,
  path: String,
  description: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    profession: req.body.profession,
    race: req.body.race,
    level: req.body.level,
    path: req.body.path,
    description: req.body.description,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

ObjectId = require('mongodb').ObjectID;

app.delete('/api/items/:id', async (req, res) => {
  try {
    var id = req.params.id;
    Item.deleteOne({ _id: ObjectId(id) }, function(err){
      if(err){
        console.log(err);
      }
    })
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    var id = req.params.id;
    Item.update({ _id: ObjectId(id) }, {
      title: req.body.title,
      profession: req.body.profession,
      race: req.body.race,
      level: req.body.level,
      description: req.body.description
    }, function(err) {
      console.log(err);
    })
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// connect to the database
mongoose.connect('mongodb://localhost:27017/players', {
  useNewUrlParser: true
});


app.listen(3000, () => console.log('Server listening on port 3000!'));

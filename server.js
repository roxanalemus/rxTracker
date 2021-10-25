const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')
const { request } = require('express')

var db, collection;

const url = "mongodb+srv://user0:Clu573R0@cluster0.txgjd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3055, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('medicine').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {Rx: result})
  })
})

app.post('/medicine', (req, res) => {
  let todaysDate = new Date();

  db.collection('medicine').insertOne({
    timeTaken:'', 
    timeToTake: req.body.timeToTake,
    med: req.body.med,
    dose: req.body.dose,
  },(err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/recordTaken', (req, res) => {
  db.collection('medicine')
  .findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)}, { 
    $set: {
      timeTaken : req.body.time
     
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
  console.log(req.body)
})

app.delete('/medicine', (req, res) => {
  console.log(req.body.id)
  db.collection('medicine').findOneAndDelete({
    _id: new mongodb.ObjectID(req.body.id),

  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('default')
  return res.redirect( 'app/index.html' )
});
MongoClient.connect('mongodb://localhost:27017/leads', function (err, db) {
  if (err) throw err
  var entries = db.collection("entries");

  router.post('/newEntry', function (req, res, next) {

    var data = req.body
    console.dir(data)
    console.log('NOW')
    entries.insert(data, function (err, result) {
      if (err) return next(err)
      return res.end()
    })
  })
  router.get('/getEntries', function (req, res, next) {
    entries.find().toArray(function (err, items) {
      return res.send({'entries': items})
    })
  })
  router.post('/update', function (req, res, next) {
//mongo returned a serialized ObjectID on original GET
    //need to turn it back into a BSON object for the query object
    console.dir(req.body)
    var obj = req.body
    var _id = new ObjectID.createFromHexString(obj._id)
    delete obj._id //mongo will not allow a duplicate _id
    entries.update({_id: _id}, obj, function (err, result) {
      if (err)return next(err)
      res.status(200).send()
    })
  })
})


module.exports = router;